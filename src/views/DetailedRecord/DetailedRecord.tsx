import { Card, CardActions, CardContent } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { getFormattedDate } from '../../lib/helpers/DateHelper';
import { MedicalRecord } from '../../lib/types/MedicalRecord';
import { NotFound } from '../../components/NotFound/NotFound';
import { PatientAddressAccess } from '../../components/PatientAddressAccess/PatientAddressAccess';
import { FileDownloader } from './FileDownloader';
import { Tags } from './Tags';

export function DetailedRecord() {
  const { getMedicalRecord } = useMedikChainApi();
  const { patientAddress, medicalRecordId } =
    useParams<{ patientAddress: string; medicalRecordId: string }>();
  const [record, setRecord] = useState<MedicalRecord>();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();

  const isRecordIdValid = () => !isNaN(+medicalRecordId);

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
  return (
    <PatientAddressAccess patientRecordAddress={patientAddress}>
      <div>
        <Card>
          <CardContent>{record?.title}</CardContent>
          <CardContent>{record?.description}</CardContent>
          <CardContent>Physician address: {record?.physician}</CardContent>
          <CardContent>
            Medical center address: {record?.medicalCenter}
          </CardContent>
          <CardContent>{record && getFormattedDate(record)}</CardContent>
          {record?.tags && (
            <CardContent>
              <Tags tags={record?.tags} />
            </CardContent>
          )}
          {record?.attachment && (
            <CardActions>
              <FileDownloader fileInfo={record.attachment} />
            </CardActions>
          )}
        </Card>
      </div>
    </PatientAddressAccess>
  );
}
