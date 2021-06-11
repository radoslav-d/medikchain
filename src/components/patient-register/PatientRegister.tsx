import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { Redirect } from 'react-router-dom';
import { TextInputField } from '../input-fields/TextInputField';

interface PatientRegisterProps {
  onRegister: () => void;
}

// TODO remove alert and add validation messages to text fields
export function PatientRegister(props: PatientRegisterProps) {
  const { registerAsPatient } = useMedikChainApi();
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [gender, setGender] = useState('');

  const register = async () => {
    await registerAsPatient(name, nationalId, gender);
    alert('Registration completed!');
    props.onRegister();
    setRegistered(true);
  };
  const isValid = () => {
    return name.trim() && nationalId.trim() && gender.trim();
  };

  if (registered) {
    return <Redirect push to="/" />;
  }
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
