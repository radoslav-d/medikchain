import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { useHistory } from 'react-router-dom';
import { TextInputField } from '../input-fields/TextInputField';

interface PatientRegisterProps {
  onRegister: () => void;
}

export function PatientRegister(props: PatientRegisterProps) {
  const { registerAsPatient } = useMedikChainApi();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();
  const history = useHistory();
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [gender, setGender] = useState('');

  const register = async () => {
    dispatchLoading();
    await registerAsPatient(name, nationalId, gender);
    props.onRegister();
    dispatchNotLoading();
    alert('Registration completed!');
    history.push('/');
  };
  const isValid = () => {
    return name.trim() && nationalId.trim() && gender.trim();
  };
  return (
    <div>
      <TextInputField
        placeholder="Patient name"
        value={name}
        onChange={setName}
        required
      />
      <TextInputField
        placeholder="National ID number"
        value={nationalId}
        onChange={setNationalId}
        required
      />
      <TextInputField
        placeholder="Gender"
        value={gender}
        onChange={setGender}
        required
      />
      <Button onClick={register} disabled={!isValid()}>
        Register
      </Button>
    </div>
  );
}
