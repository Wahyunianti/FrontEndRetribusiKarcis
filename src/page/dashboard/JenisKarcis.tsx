
import DataTableComponent from '../components/DataTableComponent';

interface Karcis {
    id: number;
    label: string;
    tarif: number;
}

export default function JenisKarcis() {
    const karcis: Karcis[] = [
        { id: 1, label: 'Dealer', tarif: 56000 },
        { id: 2, label: 'Toko', tarif: 35000 },
        { id: 3, label: 'Salon Menengah', tarif: 25000 },
        { id: 4, label: 'Restoran < 25 Meja', tarif: 75000 },
        { id: 5, label: 'K. Swasta Sedang', tarif: 56000 },
        { id: 6, label: 'Apotik / Klinik', tarif: 45000 },
        { id: 7, label: 'Bank Swasta', tarif: 70000 },
        { id: 8, label: 'Restoran > 25 Meja', tarif: 110000 },
        { id: 9, label: 'Bank BUMD', tarif: 56000 },
        { id: 10, label: 'Hotel', tarif: 100000 }
    ];

    const columns = [
        {
            name: 'ID',
            selector: (row: Karcis) => row.id,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Jenis Karcis',
            selector: (row: Karcis) => row.label,
            sortable: true,
        },
        {
            name: 'Tarif',
            selector: (row: Karcis) => row.tarif,
            sortable: true,
            cell: (row: Karcis) => `Rp ${row.tarif.toLocaleString()}`,
        },
    ];

    return (
        <section id='karcis' className="sm:p-8">
            <div className='flex flex-row gap-2 items-center'>
                <h2 className="text-2xl font-bold mb-4">Jenis Karcis</h2>
                <img src="daun2.gif" className='mb-4 rotate-45' width={40} alt="" />
            </div>
            <DataTableComponent
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
        </section>
    );
}