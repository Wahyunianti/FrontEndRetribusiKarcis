
import { useState } from 'react';
import DataTableComponent from '../components/DataTableComponent';
import SelectComponent from '../components/SelectComponent';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { GrPowerReset } from "react-icons/gr";
import { FaFileExcel } from "react-icons/fa6";
import Button from '../components/Button';

interface RetribusiData {
    id: string;
    nama: string;
    jenis_karcis: string;
    nominal: number;
    bukti: string;
    url_bukti?: string;
    total_retribusi: number;
    status: number;
}

export default function Retribusi() {
    const [selectedMonth, setSelectedMonth] = useState<{ value: string; label: string } | null>(null);

    const monthOptions = [
        { value: '01', label: 'Januari' },
        { value: '02', label: 'Februari' },
        { value: '03', label: 'Maret' },
        { value: '04', label: 'April' },
        { value: '05', label: 'Mei' },
        { value: '06', label: 'Juni' },
        { value: '07', label: 'Juli' },
        { value: '08', label: 'Agustus' },
        { value: '09', label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'Desember' },
    ];

    // Dummy data for charts
    const chartData = [
        { month: 'Jan', total: 120000 },
        { month: 'Feb', total: 150000 },
        { month: 'Mar', total: 180000 },
        { month: 'Apr', total: 200000 },
        { month: 'Mei', total: 220000 },
        { month: 'Jun', total: 250000 },
        { month: 'Jul', total: 280000 },
        { month: 'Ags', total: 300000 },
        { month: 'Sep', total: 270000 },
        { month: 'Okt', total: 240000 },
        { month: 'Nov', total: 210000 },
        { month: 'Des', total: 190000 },
    ];

    const pieData = [
        { name: 'Toko', value: 400000, color: '#0088FE' },
        { name: 'Restoran', value: 300000, color: '#00C49F' },
        { name: 'Lainnya', value: 200000, color: '#FFBB28' },
    ];
    const retribusiData: RetribusiData[] = [
        {
            id: '1',
            nama: 'Soto Lamongan Cv Imanuel',
            jenis_karcis: 'Toko',
            nominal: 56000,
            bukti: 'Non Cash (Link Bukti)',
            url_bukti: 'https://example.com/bukti1',
            total_retribusi: 112000,
            status: 1
        },
        {
            id: '2',
            nama: 'Soto Lamongan Cv Imanuel',
            jenis_karcis: 'Toko',
            nominal: 56000,
            bukti: 'Non Cash (Link Bukti)',
            url_bukti: 'https://example.com/bukti2',
            total_retribusi: 100000,
            status: 2
        },
        {
            id: '3',
            nama: 'Soto Lamongan Cv Imanuel',
            jenis_karcis: 'Toko',
            nominal: 56000,
            bukti: 'Cash',
            total_retribusi: 112000,
            status: 3
        }
    ];

    const totalNominal = retribusiData.reduce((sum, item) => sum + item.nominal, 0);
    const totalRetribusi = retribusiData.reduce((sum, item) => sum + item.total_retribusi, 0);

    const columns = [
        {
            name: 'ID',
            selector: (row: RetribusiData) => row.id,
            sortable: true,
            width: '70px',
        },
        {
            name: 'Nama',
            selector: (row: RetribusiData) => row.nama,
            sortable: true,
            width: '300px',
        },
        {
            name: 'Jenis Karcis',
            selector: (row: RetribusiData) => row.jenis_karcis,
            sortable: true,
        },
        {
            name: `Nominal (Rp ${totalNominal.toLocaleString()})`,
            selector: (row: RetribusiData) => row.nominal,
            sortable: true,
            cell: (row: RetribusiData) => `Rp ${row.nominal.toLocaleString()}`,
            width: '250px',
        },
        {
            name: 'Bukti Transaksi',
            selector: (row: RetribusiData) => row.bukti,
            sortable: true,
            cell: (row: RetribusiData) => (
                row.url_bukti ? (
                    <a href={row.url_bukti} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', textDecoration: 'none' }}>
                        {row.bukti}
                    </a>
                ) : (
                    row.bukti
                )
            ),
            width: '200px',
        },
        {
            name: `Total Retribusi (Rp ${totalRetribusi.toLocaleString()})`,
            selector: (row: RetribusiData) => row.total_retribusi,
            sortable: true,
            cell: (row: RetribusiData) => `Rp ${row.total_retribusi.toLocaleString()}`,
            width: '250px',
        },
        {
            name: 'Status',
            selector: (row: RetribusiData) => row.status,
            sortable: true,
            cell: (row: RetribusiData) => {
                const statusText = row.status === 1 ? 'Pending' : row.status === 2 ? 'Diterima' : 'Ditolak';
                return <span className={`px-2 py-1 rounded ${row.status === 1 ? 'bg-yellow-200' : row.status === 2 ? 'bg-green-200' : 'bg-red-200'}`}>{statusText}</span>;
            },
        },
    ];

    return (
        <section id='retribusi' className="sm:p-8 flex flex-col gap-4">
            <div className='flex flex-col sm:flex-row sm:justify-between'>
                <div className='flex flex-row gap-2 items-center'>
                    <h2 className="text-2xl font-bold mb-4">Retribusi</h2>
                    <img src="daun2.gif" className='mb-4 rotate-45' width={40} alt="" />
                </div>
                <div className='flex flex-row gap-2 items-center justify-between sm:justify-end'>
                    <Button
                        title="Reset Filter"
                        className='btnDanger'
                        imageSrc={<GrPowerReset />}
                    />
                    <Button
                        title="Print Laporan"
                        className='btnPrimary'
                        imageSrc={<FaFileExcel />}
                    />
                </div>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className='flex flex-col gap-3'>
                    <p className='text-lg font-semibold'>Filter Berdasarkan Tahun</p>
                    <SelectComponent
                        value={selectedMonth}
                        onChange={setSelectedMonth}
                        options={monthOptions}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='text-lg font-semibold'>Filter Berdasarkan Bulan</p>
                    <SelectComponent
                        value={selectedMonth}
                        onChange={setSelectedMonth}
                        options={monthOptions}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='text-lg font-semibold'>Filter Berdasarkan Jenis Karcis</p>
                    <SelectComponent
                        value={selectedMonth}
                        onChange={setSelectedMonth}
                        options={monthOptions}
                    />
                </div>

            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white hover:shadow-xl transition-shadow hover:cursor-pointer p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Total Retribusi Per Bulan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`Rp ${(value as number).toLocaleString()}`, 'Total']} />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#65a30d" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 hover:shadow-xl transition-shadow hover:cursor-pointer rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Distribusi Jenis Karcis</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`Rp ${(value as number).toLocaleString()}`, 'Total']} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='mt-7'>
                <DataTableComponent
                    columns={columns}
                    data={retribusiData}
                    pagination
                    paginationPerPage={5}
                    highlightOnHover
                    striped
                    responsive
                    searchable
                    searchPlaceholder="Cari retribusi..."
                    title='Hasil : Restoran <25 Meja Januari 2025'
                />
            </div>

        </section>
    );
}