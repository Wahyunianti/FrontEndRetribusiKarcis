import React from 'react';
import Select from 'react-select';

interface MonthSelectProps {
  value: { value: string; label: string } | null;
  onChange: (option: { value: string; label: string } | null) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

const SelectComponent: React.FC<MonthSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Pilih Bulan',
  className = 'w-full',
}) => {

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      className={className}
      styles={{
       control: (provided) => ({
    ...provided,
    borderColor: '#65a30d',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
    fontSize: '14px',
    '&:hover': {
      borderColor: '#65a30d',
      cursor: 'pointer',
    },
  }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#65a30d' : state.isFocused ? '#d9f99d' : 'white',
          color: state.isSelected ? 'white' : 'black',
           '&:hover': {
            cursor: 'pointer',
          },
        }),
      }}
    />
  );
};

export default SelectComponent;