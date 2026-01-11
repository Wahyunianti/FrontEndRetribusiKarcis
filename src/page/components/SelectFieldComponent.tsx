import React from 'react';
import Select from 'react-select';

export type SelectOption = {
  value: string;
  label: string;
};

interface SelectComponentProps {
  value: string | null;
  options?: SelectOption[];
  placeholder?: string;
  onChange: (value: string | null) => void;
  isClearable?: boolean;
}

const SelectFieldComponent: React.FC<SelectComponentProps> = ({
  value,
  options = [],
  placeholder = 'Pilih...',
  onChange,
  isClearable = true,
}) => {
  const selectedOption =
    options.find((opt) => opt.value === value) || null;

   return (
    <Select
      value={selectedOption}
      options={options}
      placeholder={placeholder}
      isClearable={isClearable}
      onChange={(option) =>
        onChange(option ? (option as SelectOption).value : null)
      }
      styles={{
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ? '#84cc16' : '#e4e6eb',
          boxShadow: state.isFocused ? '0 0 0 2px #5ea600' : 'none',
          '&:hover': {
            borderColor: '#65a30d',
          },
          minHeight: '20px',
          cursor: 'pointer'
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? '#84cc16'
            : state.isFocused
            ? '#ecfccb'
            : 'white',
          color: state.isSelected ? 'white' : '#14532d',
          cursor: 'pointer',
        }),
        singleValue: (base) => ({
          ...base,
          color: '#14532d',
        }),
        placeholder: (base) => ({
          ...base,
          color: '#99a1b0',
          fontSize: '14px'
        }),
        menu: (base) => ({
          ...base,
          zIndex: 999,
        }),
      }}
    />
  );
};

export default SelectFieldComponent;
