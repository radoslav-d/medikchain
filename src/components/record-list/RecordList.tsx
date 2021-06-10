import { isAddress } from '@ethersproject/address';
import { useEffect, useState } from 'react';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { MedicalRecord } from '../../models/MedicalRecord';
import { useParams } from 'react-router-dom';
import { NotFound } from '../not-found/NotFound';

// TODO implement virtual scrolling
export function RecordList() {
  const { getMedicalRecords } = useMedikChainApi();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const { patientAddress } = useParams<{ patientAddress: string }>();

  useEffect(() => {
    getMedicalRecords(patientAddress).then((resultArray) => {
      setMedicalRecords(resultArray[0]);
    });
  }, [patientAddress, getMedicalRecords]);
  if (!isAddress(patientAddress)) {
    return <NotFound />;
  }
  return (
    <div>
      {medicalRecords.map((record) => (
        <div key={record.id.toString()}>
          <div>{record.id.toString()}</div>
          <div>{record.title}</div>
          <div>{record.description}</div>
          <div>{record.patient}</div>
          <div>{record.physician}</div>
          <div>{record.medicalCenter}</div>
          <div>{record.attachment}</div>
          <div>{new Date(record.date * 1000).toUTCString()}</div>
          <div>
            {record.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
