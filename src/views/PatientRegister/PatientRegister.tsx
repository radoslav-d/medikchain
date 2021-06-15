import { Button, Paper } from '@material-ui/core';
import { useState } from 'react';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { useHistory } from 'react-router-dom';
import { TextInputField } from '../../components/Inputs/TextInputField';
import './PatientRegister.css';

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
    <Paper elevation={2} className="register-form">
      <form>
        <TextInputField
          className="register-form-item"
          placeholder="Patient name"
          value={name}
          onChange={setName}
          required
        />
        <TextInputField
          className="register-form-item"
          placeholder="National ID number"
          value={nationalId}
          onChange={setNationalId}
          required
        />
        <TextInputField
          className="register-form-item"
          placeholder="Gender"
          value={gender}
          onChange={setGender}
          required
        />
        <Button
          className="register-form-item"
          variant="contained"
          color="primary"
          onClick={register}
          disabled={!isValid()}
        >
          Register
        </Button>
      </form>
    </Paper>
  );
}
