import ChipInput from 'material-ui-chip-input';

interface TagInputFieldProps {
  placeholder: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onDelete: (tag: string, index: number) => void;
  readonly?: boolean;
}

export function TagInputField(props: TagInputFieldProps) {
  return (
    <ChipInput
      label={props.placeholder}
      value={props.tags}
      onAdd={props.onAdd}
      onDelete={props.onDelete}
      readOnly={props.readonly}
    />
  );
}
