import { Button, Paper } from '@material-ui/core';
import { useState } from 'react';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { useHistory } from 'react-router-dom';
import { TextInputField } from '../../components/Inputs/TextInputField';
import { useNotifications } from '../../hooks/useNotifications';
import './PatientRegister.css';
import { useTranslator } from '../../hooks/useTranslator';

interface PatientRegisterProps {
  onRegister: () => void;
}

export function PatientRegister(props: PatientRegisterProps) {
  const { registerAsPatient } = useMedikChainApi();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();
  const { translate } = useTranslator();
  const history = useHistory();
  const { pushSuccessNotification, pushErrorNotification } = useNotifications();
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [gender, setGender] = useState('');

  const register = async () => {
    dispatchLoading();
    try {
      await registerAsPatient(name, nationalId, gender);
      props.onRegister();
      pushSuccessNotification('notifications.register-success');
    } catch (e) {
      pushErrorNotification('notifications.register-error');
    }
    dispatchNotLoading();
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
          placeholder={translate('input-labels.patient-name')}
          value={name}
          onChange={setName}
          required
        />
        <TextInputField
          className="register-form-item"
          placeholder={translate('input-labels.national-id')}
          value={nationalId}
          onChange={setNationalId}
          required
        />
        <TextInputField
          className="register-form-item"
          placeholder={translate('input-labels.patient-gender')}
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
          {translate('input-labels.register-button')}
        </Button>
      </form>
    </Paper>
  );
}
