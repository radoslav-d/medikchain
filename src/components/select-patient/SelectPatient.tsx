import { Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { PatientInfo } from '../../models/PatientInfo';
import { RadioInputField } from '../input-fields/RadioInputField';
import { SearchBar } from '../search-bar/SearchBar';
import './SelectPatient.css';
import { VirtualList } from '../virtual-list/VirtualList';
import { PatientOverview } from './PatientOverview';

enum SearchType {
  BY_NAME = 'name',
  BY_NATIONAL_ID = 'nationalId',
}

const SEARCH_OPTIONS = [
  {
    label: 'Search by name',
    value: SearchType.BY_NAME,
  },
  {
    label: 'Search by national ID',
    value: SearchType.BY_NATIONAL_ID,
  },
];

const LIST_ITEM_HEIGHT = 76;
const VIRTUAL_LIST_HEIGHT = 450;

export function SelectPatient() {
  const [patientsInfoCache, setPatientsInfoCache] = useState<PatientInfo[]>([]);
  const [patientsInfoView, setPatientsInfoView] = useState<PatientInfo[]>([]);
  const [searchType, setSearchType] = useState<string>(SearchType.BY_NAME);
  const { getPatientsInfo } = useMedikChainApi();

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
        Find patients, so you can add new medical records or review the existing
        ones.
      </Typography>
      <div className="select-patient-search">
        <SearchBar
          inputPlaceholder="Search"
          buttonLabel="Search"
          onSearch={searchPatient}
          buttonIcon={<Search />}
        />
        <RadioInputField
          options={SEARCH_OPTIONS}
          value={searchType}
          onSelect={setSearchType}
        />
      </div>
      <div className="select-patient-list">
        <VirtualList
          data={patientsInfoView}
          mapping={(patientInfo) => (
            <PatientOverview key={patientInfo.id} patientInfo={patientInfo} />
          )}
          height={VIRTUAL_LIST_HEIGHT}
          childHeight={LIST_ITEM_HEIGHT}
        />
      </div>
    </div>
  );
}
