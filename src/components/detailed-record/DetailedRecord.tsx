import { Card, CardActions, CardContent } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { getFormattedDate, MedicalRecord } from '../../models/MedicalRecord';
import { BackdropSpinner } from '../backdrop-spinner/BackdropSpinner';
import { NotFound } from '../not-found/NotFound';
import { PatientAddressAccess } from '../patient-address-access/PatientAddressAccess';
import { FileDownloader } from './FileDownloader';
import { Tags } from './Tags';

export function DetailedRecord() {
  const { getMedicalRecord } = useMedikChainApi();
  const { patientAddress, medicalRecordId } =
    useParams<{ patientAddress: string; medicalRecordId: string }>();
  const [record, setRecord] = useState<MedicalRecord>();
  const [loading, setLoading] = useState(true);

  const isRecordIdValid = () => !isNaN(+medicalRecordId);

  useEffect(() => {
    const retrieveRecordInfo = async () => {
      if (isRecordIdValid()) {
        const record = (
          await getMedicalRecord(patientAddress, +medicalRecordId)
        )[0];
        setRecord(record);
      }
      setLoading(false);
    };
    retrieveRecordInfo();
  }, [patientAddress, medicalRecordId, getMedicalRecord]);
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
        <BackdropSpinner opened={loading} />
      </div>
    </PatientAddressAccess>
  );
}
