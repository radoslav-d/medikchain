import { isAddress } from '@ethersproject/address';
import { Button, Paper, Typography } from '@material-ui/core';
import { Delete, FilterList } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { useTranslator } from '../../hooks/useTranslator';
import { MedicalRecord } from '../../lib/types/MedicalRecord';
import { useParams } from 'react-router-dom';
import { PatientAddressAccess } from '../../components/PatientAddressAccess/PatientAddressAccess';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { VirtualList } from '../../components/VirtualList/VirtualList';
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
  const { translate } = useTranslator();

  useEffect(() => {
    const retrieveMedicalRecords = async () => {
      dispatchLoading();
      const resultArray = await getMedicalRecords(patientAddress);
      setMedicalRecordsCache(resultArray[0]);
      setMedicalRecordsView(resultArray[0]);
      dispatchNotLoading();
    };
    if (isAddress(patientAddress)) {
      retrieveMedicalRecords();
    }
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
            inputPlaceholder={translate('input-labels.search-tags')}
            buttonLabel={translate('input-labels.filter-button')}
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
            {translate('input-labels.clear-filter-button')}
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
  const { translate } = useTranslator();
  return (
    <Paper elevation={2} className="no-records-found">
      <Typography variant="subtitle1" color="secondary">
        {translate('view-labels.no-records')}
      </Typography>
    </Paper>
  );
}
