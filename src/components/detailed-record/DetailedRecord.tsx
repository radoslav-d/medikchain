import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
} from '@material-ui/core';
import { AssignmentReturned } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { getFormattedDate, MedicalRecord } from '../../models/MedicalRecord';
import { BackdropSpinner } from '../backdrop-spinner/BackdropSpinner';
import { NotFound } from '../not-found/NotFound';
import { PatientAddressAccess } from '../patient-address-access/PatientAddressAccess';

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
          <CardContent>
            <Tags tags={record?.tags} />
          </CardContent>
          {record?.attachment && (
            <CardActions disableSpacing>
              <IconButton>
                <AssignmentReturned />
              </IconButton>
              <u>{record?.attachment}</u>
            </CardActions>
          )}
        </Card>
        <BackdropSpinner opened={loading} />
      </div>
    </PatientAddressAccess>
  );
}

function Tags(props: { tags: string[] | undefined }) {
  if (!props.tags) {
    return null;
  }
  return (
    <div>
      {props.tags.map((tag) => (
        <Chip
          key={tag}
          avatar={<Avatar>#</Avatar>}
          label={tag}
          color="primary"
          variant="outlined"
        />
      ))}
    </div>
  );
}
