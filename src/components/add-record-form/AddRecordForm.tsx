import { isAddress } from '@ethersproject/address';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import {
  hasErrors,
  ValidationMessage,
  ValidationMessageSeverity,
} from '../../models/ValidationMessage';
import { NotFound } from '../not-found/NotFound';
import { ValidationMessages } from '../validation-messages/ValidationMessages';
import './AddRecordForm.css';

export function AddRecordForm() {
  const { account } = useWeb3React<JsonRpcProvider>();
  const { addMedicalRecord } = useMedikChainApi();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [medicalCenter, setMedicalCenter] = useState('');
  const [tags, setTags] = useState('');
  const [attachment, setAttachment] = useState('');
  const [validationMessages, setValidationMessages] = useState<
    ValidationMessage[]
  >([]);
  const [isAdded, setIsAdded] = useState(false);
  const { patientAddress } = useParams<{ patientAddress: string }>();

  if (!isAddress(patientAddress)) {
    return <NotFound />;
  }
  if (isAdded) {
    return <Redirect to={`/patient-records/${patientAddress}`} />;
  }

  const canAddRecord = () => {
    const messages: ValidationMessage[] = [];
    title ||
      messages.push({
        message: 'Title is required field',
        severity: ValidationMessageSeverity.ERROR,
      });
    description ||
      messages.push({
        message: 'Description is required field',
        severity: ValidationMessageSeverity.ERROR,
      });
    if (!medicalCenter || !isAddress(medicalCenter)) {
      messages.push({
        message: 'Medical center is required field and must be valid address',
        severity: ValidationMessageSeverity.ERROR,
      });
    }
    tags ||
      messages.push({
        message: 'No tags are specified for this record',
        severity: ValidationMessageSeverity.WARNING,
      });
    attachment ||
      messages.push({
        message: 'No attachment is selected for this record',
        severity: ValidationMessageSeverity.WARNING,
      });
    setValidationMessages(messages);
    return !hasErrors(messages);
  };

  const addRecord = () => {
    if (canAddRecord()) {
      addMedicalRecord(
        patientAddress,
        account as string,
        title,
        description,
        medicalCenter,
        tags?.split(' ') as string[],
        attachment
      ).then(() => {
        alert('Record added successfully!');
        setIsAdded(true);
      });
    }
  };
  return (
    <div className="add-record-form">
      title:
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      description:
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      patient:
      <input type="text" value={props.userAddress} disabled={true} />
      physician:
      <input type="text" value={account || ''} disabled={true} />
      medical center:
      <input
        type="text"
        value={medicalCenter}
        onChange={(e) => setMedicalCenter(e.target.value)}
      />
      tags:
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      attachment:
      <input
        type="text"
        value={attachment}
        onChange={(e) => setAttachment(e.target.value)}
      />
      <button onClick={addRecord}>Submit</button>
      <ValidationMessages validationMessages={validationMessages} />
    </div>
  );
}
