import { Paper, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { useTranslator } from '../../hooks/useTranslator';
import { PatientInfo } from '../../lib/types/PatientInfo';
import { RadioInputField } from '../../components/Inputs/RadioInputField';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import './SelectPatient.css';
import { VirtualList } from '../../components/VirtualList/VirtualList';
import { PatientOverview } from './PatientOverview';

const LIST_ITEM_HEIGHT = 76;
const VIRTUAL_LIST_HEIGHT = 450;

enum SearchType {
  BY_NAME = 'name',
  BY_NATIONAL_ID = 'nationalId',
}

const SEARCH_OPTIONS = [
  {
    label: 'input-labels.search-name-radio',
    value: SearchType.BY_NAME,
  },
  {
    label: 'input-labels.search-id-radio',
    value: SearchType.BY_NATIONAL_ID,
  },
];

export function SelectPatient() {
  const [patientsInfoCache, setPatientsInfoCache] = useState<PatientInfo[]>([]);
  const [patientsInfoView, setPatientsInfoView] = useState<PatientInfo[]>([]);
  const [searchType, setSearchType] = useState<string>(SearchType.BY_NAME);
  const { getPatientsInfo } = useMedikChainApi();
  const { translate } = useTranslator();

  useEffect(() => {
    const fetchPatientInfo = async () => {
      const patientInfo = (await getPatientsInfo())[0];
      setPatientsInfoCache(patientInfo);
    };
    fetchPatientInfo();
  }, [getPatientsInfo]);

  const searchPatient = (searchValue: string) => {
    const filteredPatients = patientsInfoCache.filter((patientInfo) =>
      // @ts-ignore
      matchedSearchValue(searchValue, patientInfo[searchType])
    );
    setPatientsInfoView(filteredPatients);
  };
  const matchedSearchValue = (searchValue: string, property: string): boolean =>
    property === searchValue || property.includes(searchValue);

  return (
    <div className="select-patient">
      <Typography
        className="select-patient-description"
        color="primary"
        variant="h5"
      >
        {translate('view-labels.select-patient')}
      </Typography>
      <div className="select-patient-search">
        <SearchBar
          inputPlaceholder={translate('input-labels.search')}
          buttonLabel={translate('input-labels.search')}
          onSearch={searchPatient}
          buttonIcon={<Search />}
        />
        <RadioInputField
          options={SEARCH_OPTIONS}
          value={searchType}
          onSelect={setSearchType}
        />
      </div>
      <Paper elevation={2} className="select-patient-list">
        <VirtualList
          data={patientsInfoView}
          mapping={(patientInfo) => (
            <PatientOverview key={patientInfo.id} patientInfo={patientInfo} />
          )}
          height={VIRTUAL_LIST_HEIGHT}
          childHeight={LIST_ITEM_HEIGHT}
        />
      </Paper>
    </div>
  );
}
