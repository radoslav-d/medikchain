import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { useTranslator } from '../../hooks/useTranslator';

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
  const { translate } = useTranslator();
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
          label={translate(option.label)}
          value={option.value}
          control={<Radio />}
        />
      ))}
    </RadioGroup>
  );
}
