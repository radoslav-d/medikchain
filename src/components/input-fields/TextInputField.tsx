import { isAddress } from '@ethersproject/address';
import { TextField } from '@material-ui/core';
import { useState } from 'react';

interface TextInputFieldProps {
  placeholder: string;
  value: string;
  onChange?: (newValue: string) => void;
  required?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  address?: boolean;
}

export function TextInputField(props: TextInputFieldProps) {
  const [isTouched, setIsTouched] = useState(false);
  const hasValue = () => props.value.trim().length > 0;
  const getError = () => {
    if (!isTouched) {
      return null;
    }
    if (props.required && !hasValue()) {
      return 'This field is required';
    }
    if (props.address && !isAddress(props.value)) {
      return 'This is not a valid address';
    }
    return null;
  };
  return (
    <TextField
      label={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
      error={!!getError()}
      helperText={getError()}
      onBlur={() => setIsTouched(true)}
      multiline={props.multiline}
      rows={props.multiline ? 4 : 1}
      rowsMax={props.multiline ? 10 : 1}
      disabled={props.disabled}
    />
  );
}
