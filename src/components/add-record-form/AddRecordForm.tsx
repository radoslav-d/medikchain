import { isAddress } from '@ethersproject/address';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Button } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { FileInputButton } from '../input-fields/FileInputButton';
import { TagInputField } from '../input-fields/TagInputField';
import { TextInputField } from '../input-fields/TextInputField';
import { NotFound } from '../not-found/NotFound';
import './AddRecordForm.css';

export function AddRecordForm() {
  const { account } = useWeb3React<JsonRpcProvider>();
  const { addMedicalRecord } = useMedikChainApi();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [medicalCenter, setMedicalCenter] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [attachment, setAttachment] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const { patientAddress } = useParams<{ patientAddress: string }>();
  if (!isAddress(patientAddress)) {
    return <NotFound />;
  }
  if (isAdded) {
    return <Redirect to={`/patient-records/${patientAddress}`} />;
  }
  const isValid = () =>
    title && description && medicalCenter && isAddress(medicalCenter);
  const addRecord = () => {
    addMedicalRecord(
      patientAddress,
      account as string,
      title,
      description,
      medicalCenter,
      tags,
      attachment
    ).then(() => {
      alert('Record added successfully!');
      setIsAdded(true);
    });
  };
  return (
    <div className="add-record-form">
      <TextInputField
        placeholder="Title"
        value={title}
        onChange={setTitle}
        required
      />
      <TextInputField
        placeholder="Description"
        value={description}
        onChange={setDescription}
        required
        multiline
      />
      <TextInputField
        placeholder="Patient address"
        value={patientAddress}
        address
        disabled
      />
      <TextInputField
        placeholder="Physician address"
        value={account as string}
        address
        disabled
      />
      <TextInputField
        placeholder="Medical center address"
        value={medicalCenter}
        onChange={setMedicalCenter}
        address
        required
      />
      <TagInputField
        placeholder="Tags"
        tags={tags}
        onAdd={(tag) => setTags((prevTags) => [...prevTags, tag])}
        onDelete={(tag, index) =>
          setTags((prevTags) => prevTags.filter((t) => t !== tag))
        }
      />
      <FileInputButton />
      <Button onClick={addRecord} disabled={!isValid()}>
        Submit
      </Button>
    </div>
  );
}
