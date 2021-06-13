import { useEffect, useState } from 'react';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { MedicalRecord } from '../../models/MedicalRecord';
import { useParams } from 'react-router-dom';
import { PatientAddressAccess } from '../patient-address-access/PatientAddressAccess';
import { VirtualList } from '../virtual-list/VirtualList';
import { RecordOverview } from './RecordOverview';
import './RecordList.css';

const VIRTUAL_LIST_RENDER_BUFFER = 20;
const LIST_ITEM_HEIGHT = 72;
const VIRTUAL_LIST_HEIGHT = 400;

export function RecordList() {
  const { getMedicalRecords } = useMedikChainApi();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const { patientAddress } = useParams<{ patientAddress: string }>();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();

  useEffect(() => {
    const retrieveMedicalRecords = async () => {
      dispatchLoading();
      const resultArray = await getMedicalRecords(patientAddress);
      setMedicalRecords(resultArray[0]);
      dispatchNotLoading();
    };
    retrieveMedicalRecords();
  }, [patientAddress]);

  return (
    <PatientAddressAccess patientRecordAddress={patientAddress}>
      <div className="record-list">
        <VirtualList
          renderBuffer={VIRTUAL_LIST_RENDER_BUFFER}
          childHeight={LIST_ITEM_HEIGHT}
          height={VIRTUAL_LIST_HEIGHT}
          data={medicalRecords}
          mapping={(r) => <RecordOverview key={r.id} medicalRecord={r} />}
          onEmptyList={<div>There are no records for this user</div>}
        />
      </div>
    </PatientAddressAccess>
  );
}
