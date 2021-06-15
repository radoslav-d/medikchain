import { isAddress } from '@ethersproject/address';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useIpfsClient } from '../../hooks/useIpfs';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { FileInputButton } from '../../components/Inputs/FileInputButton';
import { TagInputField } from '../../components/Inputs/TagInputField';
import { TextInputField } from '../../components/Inputs/TextInputField';
import { NotFound } from '../../components/NotFound/NotFound';
import './AddRecordForm.css';

export function AddRecordForm() {
  const { account } = useAccount();
  const { addMedicalRecord } = useMedikChainApi();
  const { uploadToIpfs } = useIpfsClient();
  const history = useHistory();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();
  const { patientAddress } = useParams<{ patientAddress: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [medicalCenter, setMedicalCenter] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<{ fileName: string; fileBuffer: Buffer }>();

  if (!isAddress(patientAddress)) {
    return <NotFound />;
  }
  const isValid = () =>
    title && description && medicalCenter && isAddress(medicalCenter);
  const addRecord = async () => {
    const fileInfo = await getFileInfo();
    dispatchLoading();
    await addMedicalRecord(
      patientAddress,
      account as string,
      title,
      description,
      medicalCenter,
      tags,
      fileInfo
    );
    dispatchNotLoading();
    alert('Record added successfully!');
    history.push(`/patient-records/${patientAddress}`);
  };
  const getFileInfo = async (): Promise<string> => {
    if (file) {
      const result = await uploadToIpfs(file.fileBuffer);
      return `${result.path}:${file.fileName}`;
    }
    return '';
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
      <FileInputButton
        onCapture={(fileName, fileBuffer) =>
          setFile({
            fileName,
            fileBuffer,
          })
        }
        onUncapture={() => setFile(undefined)}
      />
      <Button onClick={addRecord} disabled={!isValid()}>
        Submit
      </Button>
    </div>
  );
}
