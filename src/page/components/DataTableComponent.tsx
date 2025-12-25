import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';

interface DataTableComponentProps {
    columns: any[];
    data: any[];
    pagination?: boolean;
    paginationPerPage?: number;
    highlightOnHover?: boolean;
    striped?: boolean;
    responsive?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    title?: string;
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({
    columns,
    data,
    pagination = true,
    paginationPerPage = 5,
    highlightOnHover = true,
    striped = true,
    responsive = true,
    searchable = false,
    searchPlaceholder = 'Cari...',
    title = '',
}) => {
    const [search, setSearch] = useState('');

    const filteredData = useMemo(() => {
        if (!searchable || !search) return data;
        return data.filter(item =>
            columns.some(col =>
                col.selector && String(col.selector(item)).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [data, search, searchable, columns]);

    const subHeaderComponent = searchable ? (
        <div className='flex w-full flex-col-reverse text-start mb-4 sm:flex-row sm:justify-between'>
            <h3>{title}</h3>
            <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 border drop-shadow-xl border-[#65a30d] text-[14px] rounded bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 w-full max-w-sm mb-4"
            />
        </div>

    ) : null;
    const customStyles = {
        table: {
            style: {
                border: '2px solid #65a30d',
                borderRadius: '8px',
                overflow: 'hidden',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#d9f99d',
                borderBottom: '2px solid #65a30d',
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                borderBottom: '1px solid #bef264',
                '&:hover': {
                    backgroundColor: '#ecfccb',
                },
            },
        },
        cells: {
            style: {
                borderRight: '1px solid #bef264',
                padding: '12px',
            },
        },
        pagination: {
            style: {
                border: '2px solid #65a30d',
                borderRadius: '8px',
                marginTop: '1rem',
            },
        },
        subHeader: {
            style: {
                padding: '0',
                backgroundColor: 'transparent',
                width: '100%',
            },
        },
    };

    return (
        <DataTable
            columns={columns}
            data={filteredData}
            pagination={pagination}
            paginationPerPage={paginationPerPage}
            highlightOnHover={highlightOnHover}
            striped={striped}
            responsive={responsive}
            subHeader={searchable}
            subHeaderComponent={subHeaderComponent}
            customStyles={customStyles}
        />
    );
};

export default DataTableComponent;