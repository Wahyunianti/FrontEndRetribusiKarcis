import { useEffect } from 'react';
import DataTableComponent from '../components/DataTableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJenisKarcis } from '../../store/jenisKarcisSlice';
import { type RootState, type AppDispatch } from '../../store';
import LoadingPage from '../components/LoadingPage';

interface Karcis {
    id: number;
    name: string;
    nominal: number;
}

export default function JenisKarcis() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: RootState) => state.jenisKarcis);

    useEffect(() => {
        dispatch(fetchJenisKarcis());
    }, [dispatch]);

    const karcis: Karcis[] = data.map(item => ({
        id: item.id,
        name: item.name,
        nominal: item.nominal,
    }));

    const columns = [
        {
            name: 'ID',
            selector: (row: Karcis) => row.id,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Jenis Karcis',
            selector: (row: Karcis) => row.name,
            sortable: true,
        },
        {
            name: 'Tarif',
            selector: (row: Karcis) => row.nominal,
            sortable: true,
            cell: (row: Karcis) => `Rp ${row.nominal.toLocaleString()}`,
        },
    ];

    return (
        <section id='karcis' className="sm:p-8">
            <div className='flex flex-row gap-2 items-center'>
                <h2 className="text-2xl font-bold mb-4">Jenis Karcis</h2>
                <img src="daun2.gif" className='mb-4 rotate-45' width={40} alt="" />
            </div>
            {loading ? <LoadingPage heigth='h-82'/> : <DataTableComponent
                    columns={columns}
                    data={karcis}
                    pagination
                    paginationPerPage={5}
                    highlightOnHover
                    striped
                    responsive
                    searchable
                    searchPlaceholder="Cari jenis karcis..."
                />
            }
        </section>
    );
}