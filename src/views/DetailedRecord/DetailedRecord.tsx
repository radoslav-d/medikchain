import { isAddress } from '@ethersproject/address';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { getFormattedDate } from '../../lib/helpers/DateHelper';
import { MedicalRecord } from '../../lib/types/MedicalRecord';
import { NotFound } from '../../components/NotFound/NotFound';
import { PatientAddressAccess } from '../../components/PatientAddressAccess/PatientAddressAccess';
import { FileDownloadButton } from '../../components/Inputs/FileDownloadButton';
import { Tags } from './Tags';
import './DetailedRecord.css';

export function DetailedRecord() {
  const { getMedicalRecord } = useMedikChainApi();
  const { patientAddress, medicalRecordId } =
    useParams<{ patientAddress: string; medicalRecordId: string }>();
  const [record, setRecord] = useState<MedicalRecord>();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();

  const isRecordIdValid = () =>
    !isNaN(+medicalRecordId) && isAddress(patientAddress);

  useEffect(() => {
    const retrieveRecordInfo = async () => {
      dispatchLoading();
      if (isRecordIdValid()) {
        const record = (
          await getMedicalRecord(patientAddress, +medicalRecordId)
        )[0];
        setRecord(record);
      }
      dispatchNotLoading();
    };
    retrieveRecordInfo();
  }, [patientAddress, medicalRecordId]);
  if (!isRecordIdValid()) {
    return <NotFound />;
  }

  const secondaryContent = [
    record && getFormattedDate(record),
    `Patient address: ${record?.patient}`,
    `Physician address: ${record?.physician}`,
    `Medical center address: ${record?.medicalCenter}`,
  ];

  return (
    <PatientAddressAccess patientRecordAddress={patientAddress}>
      <Card className="detailed-record">
        <CardContent>
          <Typography variant="h4" color="primary">
            {record?.title}
          </Typography>
        </CardContent>
        <CardContent>
          {secondaryContent.map((data) => (
            <Typography variant="subtitle1" color="primary">
              {data}
            </Typography>
          ))}
        </CardContent>
        <CardContent>
          <Typography variant="body1">{record?.description}</Typography>
        </CardContent>
        {record?.tags && (
          <CardContent>
            <Tags tags={record?.tags} />
          </CardContent>
        )}
        {record?.attachment && (
          <CardActions>
            <FileDownloadButton fileInfo={record.attachment} />
          </CardActions>
        )}
      </Card>
    </PatientAddressAccess>
  );
}
