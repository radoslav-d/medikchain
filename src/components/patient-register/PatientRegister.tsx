import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { Redirect } from 'react-router-dom';

interface PatientRegisterProps {
  onRegister: () => void;
}

// TODO remove alert and add validation messages to text fields
export function PatientRegister(props: PatientRegisterProps) {
  const { registerAsPatient } = useMedikChainApi();
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  const register = () => {
    registerAsPatient(name, birthday, gender).then(() => {
      alert('Registration completed!');
      props.onRegister();
      setRegistered(true);
    });
  };
  if (registered) {
    return <Redirect push to="/" />;
  }
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <input
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <Button onClick={register}>Register</Button>
    </div>
  );
}
