import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { TableStyles } from 'react-data-table-component';

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
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({
    columns,
    data,
    pagination = true,
    paginationPerPage = 10,
    highlightOnHover = true,
    striped = true,
    responsive = true,
    searchable = false,
    searchPlaceholder = 'Cari...',
    title = '',
    onEdit,
    onDelete,
}) => {
    const [search, setSearch] = useState('');

    const filteredData = useMemo(() => {
        if (!searchable || !search) return data;
        return data.filter(item =>
            columns.some(col =>
                col.selector &&
                String(col.selector(item))
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
        );
    }, [data, search, searchable, columns]);

    const actionColumn = useMemo(
        () => ({
            name: 'Action',
            width: '120px',
            center: true,
            cell: (row: any) => (
                <div className="flex gap-2">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(row)}
                            className="p-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer transition"
                            title="Edit"
                        >
                            <FaEdit size={14} />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(row)}
                            className="p-2 rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer transition"
                            title="Hapus"
                        >
                            <FaTrash size={14} />
                        </button>
                    )}
                </div>
            ),
        }),
        [onEdit, onDelete]
    );

    const mergedColumns = useMemo(() => {
        if (!onEdit && !onDelete) return columns;
        return [...columns, actionColumn];
    }, [columns, actionColumn, onEdit, onDelete]);

    const subHeaderComponent = searchable ? (
        <div className="flex w-full flex-col-reverse text-start mb-4 sm:flex-row sm:justify-between">
            <h3 className="text-lg font-semibold text-lime-700">{title}</h3>
            <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 border drop-shadow-xl border-[#65a30d] text-[14px] rounded bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 w-full xl:max-w-sm mb-4"
            />
        </div>
    ) : null;

    const customStyles: TableStyles = {
        table: {
            style: {
                border: '2px solid #65a30d',
                borderRadius: '8px',
                overflow: 'auto',
            },
        },
        headRow: {
            style: {
                backgroundImage: 'linear-gradient(90deg, #d9f99d 0%, #fef3c6 50%, #d9f99d 100%)',
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
                whiteSpace: 'normal' as const,
                overflowWrap: 'anywhere' as const,
                lineHeight: '2',
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
            columns={mergedColumns}
            data={filteredData}
            pagination={pagination}
            paginationPerPage={paginationPerPage}
            highlightOnHover={highlightOnHover}
            striped={striped}
            responsive={responsive}
            subHeader={searchable}
            subHeaderComponent={subHeaderComponent}
            customStyles={customStyles}
            noDataComponent={
                <div className="py-6 text-center text-gray-500 text-sm">
                    Tidak ada data untuk ditampilkan..
                </div>
            }
        />
    );
};

export default DataTableComponent;