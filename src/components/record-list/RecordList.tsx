import { Button, Paper, Typography } from '@material-ui/core';
import { Delete, FilterList } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { MedicalRecord } from '../../models/MedicalRecord';
import { useParams } from 'react-router-dom';
import { PatientAddressAccess } from '../patient-address-access/PatientAddressAccess';
import { SearchBar } from '../search-bar/SearchBar';
import { VirtualList } from '../virtual-list/VirtualList';
import { RecordOverview } from './RecordOverview';
import './RecordList.css';

const LIST_ITEM_HEIGHT = 72;
const VIRTUAL_LIST_HEIGHT = 500;

export function RecordList() {
  const { getMedicalRecords } = useMedikChainApi();
  const [medicalRecordsCache, setMedicalRecordsCache] = useState<
    MedicalRecord[]
  >([]);
  const [medicalRecordsView, setMedicalRecordsView] = useState<MedicalRecord[]>(
    []
  );
  const { patientAddress } = useParams<{ patientAddress: string }>();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();

  useEffect(() => {
    const retrieveMedicalRecords = async () => {
      dispatchLoading();
      const resultArray = await getMedicalRecords(patientAddress);
      setMedicalRecordsCache(resultArray[0]);
      setMedicalRecordsView(resultArray[0]);
      dispatchNotLoading();
    };
    retrieveMedicalRecords();
  }, [patientAddress]);

  const searchRecord = (searchValue: string) => {
    const filteredRecords = medicalRecordsCache.filter((record) =>
      record.tags.some(
        (tag) => tag === searchValue || tag.includes(searchValue)
      )
    );
    setMedicalRecordsView(filteredRecords);
  };

  const isViewFiltered = () =>
    medicalRecordsCache.length !== medicalRecordsView.length;

  return (
    <PatientAddressAccess patientRecordAddress={patientAddress}>
      <div className="record-list">
        <div className="record-list-search">
          <SearchBar
            inputPlaceholder="Search by tags"
            buttonLabel="Filter"
            onSearch={searchRecord}
            buttonIcon={<FilterList />}
          />
          <Button
            endIcon={<Delete />}
            color="secondary"
            style={{
              visibility: isViewFiltered() ? 'visible' : 'hidden',
            }}
            onClick={() => setMedicalRecordsView(medicalRecordsCache)}
          >
            Clear filter
          </Button>
        </div>
        <Paper elevation={2}>
          <VirtualList
            childHeight={LIST_ITEM_HEIGHT}
            height={VIRTUAL_LIST_HEIGHT}
            data={medicalRecordsView}
            mapping={(r) => <RecordOverview key={r.id} medicalRecord={r} />}
            onEmptyList={<NoRecordsFound />}
          />
        </Paper>
      </div>
    </PatientAddressAccess>
  );
}

function NoRecordsFound() {
  return (
    <Paper elevation={2} className="no-records-found">
      <Typography variant="subtitle1" color="secondary">
        There are no records found
      </Typography>
    </Paper>
  );
}
