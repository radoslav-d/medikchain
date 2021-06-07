import { useState } from "react";
import { useMedikChainApi } from "../../hooks/useMedikChainApi";
import { MedicalRecord } from "../../models/MedicalRecord";
import { PropsWithUserAddress } from "../../models/PropsWithUserAddress";

// TODO implement virtual scrolling
export function RecordList(props: PropsWithUserAddress) {
  const { getMedicalRecords } = useMedikChainApi();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  getMedicalRecords(props.userAddress)
    .then((records) => {
      setMedicalRecords(records[0]);
    })
    .catch(console.error);
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
