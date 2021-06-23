import { isAddress } from '@ethersproject/address';
import { Button, Paper, Typography } from '@material-ui/core';
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
import { useNotifications } from '../../hooks/useNotifications';
import { useTranslator } from '../../hooks/useTranslator';
import { uploadToIpfs } from '../../lib/helpers/FileAttachmentUtils';
import { FileAttachment } from '../../lib/types/FileAttachment';
import './AddRecordForm.css';

export function AddRecordForm() {
  const { account } = useAccount();
  const { translate } = useTranslator();
  const { addMedicalRecord } = useMedikChainApi();
  const history = useHistory();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();
  const { pushErrorNotification, pushSuccessNotification } = useNotifications();
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
    try {
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
      pushSuccessNotification('notifications.add-record-success');
    } catch (e) {
      pushErrorNotification('notifications.add-record-error');
    }
    dispatchNotLoading();
    history.push(`/patient-records/${patientAddress}`);
  };
  const uploadFile = async () => {
    if (file) {
      return await uploadToIpfs(file);
    }
    return '';
  };
  return (
    <Paper elevation={2} className="add-record-form">
      <Typography variant="h6" color="primary">
        {translate('view-labels.add-record')}
      </Typography>
      <TextInputField
        className="add-record-form-item"
        placeholder={translate('input-labels.title')}
        value={title}
        onChange={setTitle}
        required
      />
      <TextInputField
        className="add-record-form-item"
        placeholder={translate('input-labels.description')}
        value={description}
        onChange={setDescription}
        required
        multiline
      />
      <TextInputField
        className="add-record-form-item"
        placeholder={translate('input-labels.patient-address')}
        value={patientAddress}
        address
        disabled
      />
      <TextInputField
        className="add-record-form-item"
        placeholder={translate('input-labels.physician-address')}
        value={account as string}
        address
        disabled
      />
      <TextInputField
        className="add-record-form-item"
        placeholder={translate('input-labels.medical-center-address')}
        value={medicalCenter}
        onChange={setMedicalCenter}
        address
        required
      />
      <TagInputField
        className="add-record-form-item"
        placeholder={translate('input-labels.tags')}
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
        {translate('input-labels.submit-button')}
      </Button>
    </Paper>
  );
}
