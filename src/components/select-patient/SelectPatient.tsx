import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { PatientInfo } from '../../models/PatientInfo';

export function SelectPatient() {
  const [searchValue, setSearchValue] = useState('');
  const [patientsInfoCache, setPatientsInfoCache] = useState<PatientInfo[]>([]);
  const [patientsInfoView, setPatientsInfoView] = useState<PatientInfo[]>([]);
  const { getPatientsInfo } = useMedikChainApi();
  const match = useRouteMatch();

  const fetchPatientInfo = async () => {
    const patientInfo = (await getPatientsInfo())[0];
    setPatientsInfoCache(patientInfo);
  };
  const searchPatient = () => {
    const filteredPatients = patientsInfoCache.filter(
      (patientInfo) =>
        patientInfo.name === searchValue ||
        patientInfo.name.includes(searchValue)
    );
    setPatientsInfoView(filteredPatients);
  };
  useEffect(() => {
    fetchPatientInfo();
  }, [fetchPatientInfo]);
  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button onClick={searchPatient} disabled={searchValue.trim().length < 2}>
        Search
      </Button>
      <div>
        {patientsInfoView.map((patientInfo) => (
          <div key={patientInfo.id}>
            <span>
              {patientInfo.id} | {patientInfo.name}
            </span>
            <Button>
              <Link to={`${match.url}/new/${patientInfo.id}`}>
                Add new medical record
              </Link>
            </Button>
            <Button>
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
