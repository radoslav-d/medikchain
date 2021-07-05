import { Button } from '@material-ui/core';
import { ReactNode, useState } from 'react';
import { TextInputField } from '../Inputs/TextInputField';
import './SearchBar.css';

interface SearchBarProps {
  inputPlaceholder: string;
  buttonLabel: string;
  onSearch: (searchValue: string) => void;
  buttonIcon?: ReactNode;
}

export function SearchBar(props: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="search-bar">
      <TextInputField
        className="search-input"
        placeholder={props.inputPlaceholder}
        value={searchValue}
        onChange={setSearchValue}
      />
      <div className="search-button-wrapper">
        <Button
          onClick={() => props.onSearch(searchValue)}
          variant="contained"
          color="primary"
          disabled={searchValue.trim().length < 2}
          startIcon={props.buttonIcon}
        >
          {props.buttonLabel}
        </Button>
      </div>
    </div>
  );
}
