import { isAddress } from '@ethersproject/address';
import { Button, Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { FileUploadButton } from '../../components/Inputs/FileUploadButton';
import { TagInputField } from '../../components/Inputs/TagInputField';
import { TextInputField } from '../../components/Inputs/TextInputField';
import { NotFound } from '../../components/NotFound/NotFound';
import { uploadToIpfs } from '../../lib/helpers/FileAttachmentUtils';
import { FileAttachment } from '../../lib/types/FileAttachment';
import './AddRecordForm.css';

export function AddRecordForm() {
  const { account } = useAccount();
  const { addMedicalRecord } = useMedikChainApi();
  const history = useHistory();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();
  const { patientAddress } = useParams<{ patientAddress: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [medicalCenter, setMedicalCenter] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<FileAttachment>();

  if (!isAddress(patientAddress)) {
    return <NotFound />;
  }
  const isValid = () => {
    return title && description && medicalCenter && isAddress(medicalCenter);
  };

  const addRecord = async () => {
    dispatchLoading();
    const fileSummary = await uploadFile();
    await addMedicalRecord(
      patientAddress,
      account as string,
      title,
      description,
      medicalCenter,
      tags,
      fileSummary
    );
    dispatchNotLoading();
    alert('Record added successfully!');
    history.push(`/patient-records/${patientAddress}`);
  };
  const uploadFile = async () => {
    if (file) {
      return await uploadToIpfs(file);
    }
    return '';
  };
  return (
    <div className="add-record-form">
      <Typography variant="h6" color="primary">
        Fill in a new medical record
      </Typography>
      <TextInputField
        className="add-record-form-item"
        placeholder="Title"
        value={title}
        onChange={setTitle}
        required
      />
      <TextInputField
        className="add-record-form-item"
        placeholder="Description"
        value={description}
        onChange={setDescription}
        required
        multiline
      />
      <TextInputField
        className="add-record-form-item"
        placeholder="Patient address"
        value={patientAddress}
        address
        disabled
      />
      <TextInputField
        className="add-record-form-item"
        placeholder="Physician address"
        value={account as string}
        address
        disabled
      />
      <TextInputField
        className="add-record-form-item"
        placeholder="Medical center address"
        value={medicalCenter}
        onChange={setMedicalCenter}
        address
        required
      />
      <TagInputField
        className="add-record-form-item"
        placeholder="Tags"
        tags={tags}
        onAdd={(tag) => setTags((prevTags) => [...prevTags, tag])}
        onDelete={(tag, index) =>
          setTags((prevTags) => prevTags.filter((t) => t !== tag))
        }
      />
      <FileUploadButton
        className="add-record-form-item upload-file-button"
        onCapture={setFile}
        onUncapture={() => setFile(undefined)}
      />
      <Button
        className="add-record-form-item"
        color="primary"
        variant="contained"
        onClick={addRecord}
        disabled={!isValid()}
        endIcon={<Send />}
      >
        Submit
      </Button>
    </div>
  );
}
