import { isAddress } from '@ethersproject/address';
import { useEffect, useState } from 'react';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { MedicalRecord } from '../../models/MedicalRecord';
import { useParams } from 'react-router-dom';
import { BackdropSpinner } from '../backdrop-spinner/BackdropSpinner';
import { NotFound } from '../not-found/NotFound';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrieveMedicalRecords = async () => {
      const resultArray = await getMedicalRecords(patientAddress);
      setMedicalRecords(resultArray[0]);
      setLoading(false);
    };
    retrieveMedicalRecords();
  }, [patientAddress, getMedicalRecords]);
  if (!isAddress(patientAddress)) {
    return <NotFound />;
  }

  return (
    <div className="record-list">
      <VirtualList
        renderBuffer={VIRTUAL_LIST_RENDER_BUFFER}
        childHeight={LIST_ITEM_HEIGHT}
        height={VIRTUAL_LIST_HEIGHT}
        data={medicalRecords}
        mapping={(r) => <RecordOverview key={r.id} medicalRecord={r} />}
      />
      <BackdropSpinner opened={loading} />
    </div>
  );
}
