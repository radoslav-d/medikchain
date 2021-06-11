import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { PatientInfo } from '../../models/PatientInfo';
import { RadioInputField } from '../input-fields/RadioInputField';
import { TextInputField } from '../input-fields/TextInputField';

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

export function SelectPatient() {
  const [searchValue, setSearchValue] = useState('');
  const [patientsInfoCache, setPatientsInfoCache] = useState<PatientInfo[]>([]);
  const [patientsInfoView, setPatientsInfoView] = useState<PatientInfo[]>([]);
  const [searchType, setSearchType] = useState<string>(SearchType.BY_NAME);
  const { getPatientsInfo } = useMedikChainApi();
  const match = useRouteMatch();

  const fetchPatientInfo = async () => {
    const patientInfo = (await getPatientsInfo())[0];
    setPatientsInfoCache(patientInfo);
  };
  const searchPatient = () => {
    const filteredPatients = patientsInfoCache.filter((patientInfo) =>
      // @ts-ignore
      matchedSearchValue(patientInfo[searchType])
    );
    setPatientsInfoView(filteredPatients);
  };
  const matchedSearchValue = (property: string): boolean =>
    property === searchValue || property.includes(searchValue);

  useEffect(() => {
    fetchPatientInfo();
  }, [fetchPatientInfo]);
  return (
    <div>
      <TextInputField
        placeholder="Search"
        value={searchValue}
        onChange={setSearchValue}
        required
      />
      <RadioInputField
        options={SEARCH_OPTIONS}
        value={searchType}
        onSelect={setSearchType}
      />
      <Button
        onClick={searchPatient}
        variant="contained"
        color="primary"
        disabled={searchValue.trim().length < 2}
      >
        Search
      </Button>
      <div>
        {patientsInfoView.map((patientInfo) => (
          <div key={patientInfo.id}>
            <span>
              {patientInfo.id} | {patientInfo.name} | {patientInfo.nationalId}
            </span>
            <Button variant="outlined">
              <Link to={`${match.url}/new/${patientInfo.id}`}>
                Add new medical record
              </Link>
            </Button>
            <Button variant="outlined">
              <Link to={`${match.url}/${patientInfo.id}`}>
                Review medical history
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
