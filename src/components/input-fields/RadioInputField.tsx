import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

interface RadioInputFieldOption {
  label: string;
  value: string;
}

interface RadioInputFieldProps {
  options: RadioInputFieldOption[];
  value: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function RadioInputField(props: RadioInputFieldProps) {
  return (
    <RadioGroup
      className={props.className}
      row
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
