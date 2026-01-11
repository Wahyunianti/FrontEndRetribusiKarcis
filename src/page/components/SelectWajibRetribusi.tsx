import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Select from 'react-select';
import {
    fetchWajibRetribusiName,
    setKeyword,
} from '../../store/wajibRetribusiSlice';
import type { RootState, AppDispatch } from '../../store';

const SelectWajibRetribusi = ({ value, onChange, name }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data4, loading4, pagination, keyword } = useSelector(
        (state: RootState) => state.retribusi
    );

    const options = data4.map((item: any) => ({
        value: item.id,
        label: item.name,
    }));

    useEffect(() => {
        dispatch(fetchWajibRetribusiName({ page: 1, keyword }));
    }, [dispatch, keyword]);

    return (
        <Select
            options={options}
            isLoading={loading4}
            name={name}
            placeholder="Cari wajib retribusi..."
            isClearable

            onInputChange={(inputValue, { action }) => {
                if (action === 'input-change') {
                    dispatch(setKeyword(inputValue));
                }
            }}


            onMenuScrollToBottom={() => {
                if (
                    pagination &&
                    pagination.current_page < pagination.last_page
                ) {
                    dispatch(
                        fetchWajibRetribusiName({
                            page: pagination.current_page + 1,
                            keyword,
                        })
                    );
                }
            }}

            value={options.find((o) => o.value === value) || null}

            onChange={(opt) => {
                if (!opt) {
                    dispatch(setKeyword(''));
                    dispatch(fetchWajibRetribusiName({ page: 1, keyword: '' }));
                }
                onChange(opt ? opt.value : null);
            }}
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

export default SelectWajibRetribusi;
