import DataTableComponent from "../components/DataTableComponent";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJenisKarcis } from '../../store/jenisKarcisSlice';
import { type RootState, type AppDispatch } from '../../store';
import LoadingPage from '../components/LoadingPage';

interface Karcis {
    id: number;
    name: string;
    jumlah: number;
    nominal: number;
    nomor_seri: string;
    total_lembar: number
}


export default function DataJenisKarcis() {

    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: RootState) => state.jenisKarcis);

    useEffect(() => {
        dispatch(fetchJenisKarcis());
    }, [dispatch]);

    const karcis: Karcis[] = data.map(item => ({
        id: item.id,
        name: item.name,
        nominal: item.nominal,
        jumlah: item.jumlah,
        nomor_seri: item.nomor_seri,
        total_lembar: item.total_lembar
    }));

    const columns = [
        { name: 'ID', cell: (_row: any, index: number) => index + 1, width: '7%' },
        {
            name: 'Jenis Karcis',
            selector: (row: Karcis) => row.name,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Jumlah Bonggol',
            selector: (row: Karcis) => Number(row.total_lembar),
            cell: (row: Karcis) => `${row.total_lembar} Lembar`,
            sortable: true,
        },
        {
            name: 'Nomor Seri Karcis',
            selector: (row: Karcis) => row.nomor_seri,
            width: '28%',
            wrap: true,
        },
        {
            name: 'Nominal',
            selector: (row: Karcis) => row.nominal,
            sortable: true,
            cell: (row: Karcis) => `Rp ${row.nominal.toLocaleString()}`,
        },
        {
            name: 'Jumlah',
            selector: (row: Karcis) => Number(row.jumlah),
            sortable: true,
            cell: (row: Karcis) => `Rp ${Number(row.jumlah).toLocaleString()}`,
        },
    ];

    return (
        <>
            <div className="w-full flex flex-col gap-10 h-min">
                <div>
                    <div className="flex flex-row justify-between mb-4">
                        <h2 className="text-2xl font-bold bg-linear-to-r from-lime-800 to-amber-600 bg-clip-text text-transparent">
                            Data Jenis Karcis
                        </h2>
                    </div>
                    <div className="">
                        {loading ?
                            <LoadingPage heigth="h-100" />
                            :
                            <DataTableComponent
                                columns={columns}
                                data={karcis}
                                pagination
                                paginationPerPage={10}
                                highlightOnHover
                                striped
                                responsive
                                searchable
                                searchPlaceholder="Cari Nama Jenis Karcis..."
                            />
                        }
                    </div>
                </div>

            </div>
        </>
    );
}