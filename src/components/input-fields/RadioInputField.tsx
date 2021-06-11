import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

interface RadioInputFieldOption {
  label: string;
  value: string;
}

interface RadioInputFieldProps {
  options: RadioInputFieldOption[];
  value: string;
  onSelect: (value: string) => void;
}

export function RadioInputField(props: RadioInputFieldProps) {
  return (
    <RadioGroup
      value={props.value}
      onChange={(e) => props.onSelect(e.target.value)}
    >
      {props.options.map((option) => (
        <FormControlLabel
          key={option.value}
          label={option.label}
          value={option.value}
          control={<Radio />}
        />
      ))}
    </RadioGroup>
  );
}
