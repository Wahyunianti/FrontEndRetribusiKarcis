import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../../store';
import LoadingPage from '../components/LoadingPage';
import { IoMdAddCircleOutline } from "react-icons/io";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ModalEditTambah from "../components/ModalEditTambah";
import { IoStorefrontOutline } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import SelectComponent from "../components/SelectComponent";
import Input from "../components/Input";
import { FaSearch } from "react-icons/fa";
import {
    fetchTransaksi,
    createTransaksi,
    deleteTransaksi
} from "../../store/transaksiSlice";
import { FaTrashAlt } from "react-icons/fa";
import { ENV } from "../../config/env";
import { GrPowerReset } from "react-icons/gr";
import { useRef } from 'react';

interface Zona {
    id: string;
    name: string;
}

type ModalMode = 'create' | 'edit';

export default function DataTransaksi() {
    const [selectedMonth, setSelectedMonth] = useState<{ value: string; label: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

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

    const dispatch = useDispatch<AppDispatch>();
    const { data6, loading6, error6 } = useSelector((state: RootState) => state.transaksi);
    const formatDateTime = (date: Date) => {
        const pad = (n: number) => String(n).padStart(2, '0');

        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
            date.getDate()
        )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
            date.getSeconds()
        )}`;
    };

    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>('create');
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [selectedData, setSelectedData] = useState<Zona | null>(null);
    const [date, setDate] = useState(formatDateTime(new Date()));
    const [bukti, setBukti] = useState<File | null>(null);

    const [search, setSearch] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [image, setImage] = useState('');
    const [selectedWajibRetribusiId, setSelectedWajibRetribusiId] = useState('');

    const openCreateData = () => {
        setModalMode('create');
        setSelectedData(null);
        setSelectedWajibRetribusiId('');
        setDate('');
        setBukti(null);
        setOpenModal(true);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('wajib_retribusi_id', selectedWajibRetribusiId);
        if (date) {
            formData.append('created_at', date);
        } else {
            const now = new Date();
            formData.append('created_at', formatDateTime(now));
        }

        if (bukti) {
            formData.append('url_document', bukti);
        }

        dispatch(createTransaksi(formData))
            .unwrap()
            .then(() => {
                setOpenModal(false);
                dispatch(fetchTransaksi({ page: 1 }));
            });
    };

    const handleDeleteRow = () => {
        if (!selectedData) return;

        dispatch(deleteTransaksi(selectedData.id))
            .unwrap()
            .then(() => setOpenModalDelete(false));
    };

    const handleSearch = () => {
        setCurrentPage(1);
        setHasMore(true);
        dispatch(fetchTransaksi({ page: 1, search: search, month: selectedMonth?.value }));
    };

    const handleReset = () => {
        setCurrentPage(1);
        setHasMore(true);
        dispatch(fetchTransaksi({ page: 1 }));
        setSearch('');
        setSelectedMonth(null);
    };

    function formatDate(dateString: string) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;

        if (
            el.scrollTop + el.clientHeight >= el.scrollHeight - 100 &&
            !loading6 &&
            hasMore
        ) {
            setCurrentPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        dispatch(fetchTransaksi({ page: currentPage, search, month: selectedMonth?.value }));
    }, [dispatch, currentPage]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [loading6, hasMore]);

    return (
        <>
            <div ref={scrollRef} className="w-full flex flex-col gap-10 relative min-h-screen overflow-y-auto">
                <div className="flex flex-col mb-20 xl:mb-0">
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <h2 className="text-2xl font-bold bg-linear-to-r from-lime-800 to-amber-600 bg-clip-text text-transparent">
                            Data KARCIS MASUK
                        </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button
                            title="Tambah Transaksi"
                            className="btnPrimary h-min w-max hidden xl:flex"
                            imageSrc={<IoMdAddCircleOutline />}
                            onClick={() => openCreateData()}
                        />
                        <form className="flex flex-col gap-3 items-center">
                            <Input
                                placeholder="Masukkan Nama Wajib Retribusi"
                                className="border-lime-700"
                                value={search}
                                onChange={(e: any) => setSearch(e.target.value)}
                            />
                            <SelectComponent
                                value={selectedMonth}
                                onChange={setSelectedMonth}
                                options={monthOptions}
                            />
                            <div className='flex flex-row gap-4'>
                                <Button
                                    title="Cari"
                                    type='button'
                                    className="btnPrimary h-min w-max"
                                    imageSrc={<FaSearch />}
                                    onClick={handleSearch}
                                />
                                <Button
                                    title="Reset"
                                    type='button'
                                    className="btnDanger h-min w-max"
                                    imageSrc={<GrPowerReset />}
                                    onClick={handleReset}
                                />
                            </div>

                        </form>


                    </div>
                    {loading6 && <LoadingPage />}
                    {error6 ? <p className="text-red-600 text-center mt-10">{error6}</p> :
                        Array.isArray(data6) && data6.map((item: any) => (
                            <div key={item.id} className="flex mt-10 flex-col gap-2 w-full h-min border-3 border-solid border-lime-200 p-4 overflow-hidden bg-white rounded-xl border-gradient-to-r from-lime-600 to-amber-500 shadow-lg shadow-lime-200/50">
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm text-end font-bold border-2 border-red-500 text-red-500 px-3 py-1 rounded-lg">LUNAS</p>
                                    <p className="text-lime-800 text-sm text-end font-bold">{item.created_at ? formatDate(item.created_at) : '-'}</p> </div> <div className="flex flex-row gap-3 p-3">
                                    <div className="grid place-items-start"> <IoStorefrontOutline size={50} className="text-lime-600" />
                                    </div>
                                    <div className="flex flex-col gap-1"> <p className="text-lime-800 text-sm font-bold">{item.wajib_retribusi?.name}</p>
                                        <p className="text-lime-800 text-sm font-bold">Jenis karcis : {item.wajib_retribusi?.jenis_karcis?.name}</p>
                                        <p className="text-lime-800 text-sm font-bold">Nominal : Rp. {Number(item.wajib_retribusi?.jenis_karcis?.nominal).toLocaleString()}</p>
                                        {/* <p className="text-lime-800 text-sm font-bold">Total : Rp. {Number(item.wajib_retribusi?.jenis_karcis?.nominal).toLocaleString()}</p> */}
                                    </div> </div>
                                <div className="flex flex-row justify-between">
                                    <FaTrashAlt onClick={() => { setSelectedData(item); setOpenModalDelete(true) }} size={20} className="text-red-600 cursor-pointer" />
                                    {item.url_document && (
                                        <button
                                            onClick={() => { setImage(`${ENV.FILE_URL}/${item.url_document}`); setShowImage(true); }}
                                        >
                                            <p className="text-lime-800 text-sm text-end font-bold cursor-pointer justify-end flex flex-row gap-2">Lihat Bukti Transaksi <span><FaExternalLinkAlt size={15} className="text-lime-700" /></span></p>
                                        </button>
                                    )}

                                </div>
                            </div>
                        ))
                    }

                    {!error6 && data6.length > 0 && (
                        <div className='grid place-items-center my-10'>
                            <button className='border-dotted border-2 flex flex-row gap-3 rounded-md p-2 bg-white cursor-pointer items-center' onClick={() => setCurrentPage(prev => prev + 1)}>Tampilkan Lebih Banyak {loading6 && <span className='w-5 h-5 border-4 border-gray-200 border-t-slate-500 rounded-full animate-spin'></span>}</button>
                        </div>
                    )}

                </div>
                <div
                    className="h-min fixed bg-white drop-shadow-2xl drop-shadow-lime-700/50 flex xl:absolute bottom-20 inset-x-7 px-7 pb-4 rounded-4xl xl:hidden"
                >
                    <Button
                        title="Tambah Transaksi"
                        className="btnPrimary h-min w-full"
                        imageSrc={<IoMdAddCircleOutline />}
                        onClick={() => openCreateData()}
                    />
                </div>
            </div>

            {showImage && (
                <div
                    className="fixed inset-0 z-9999 bg-black/70 flex items-center justify-center"
                    onClick={() => setShowImage(false)}
                >
                    <div
                        className="relative max-w-[60%] max-h-[90%]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute -top-4 -right-4 bg-white text-black w-8 h-8 rounded-full font-bold shadow"
                            onClick={() => setShowImage(false)}
                        >
                            ✕
                        </button>

                        <img
                            src={image}
                            alt="Bukti Transaksi"
                            className="max-h-[80vh] max-w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}

            <ModalEditTambah
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleSubmit}
                isFormValid={!!selectedWajibRetribusiId}
                isTransaction={true}
                title={'Tambah Transaksi'}
                submitText={'Simpan'}
                onSelectChange={setSelectedWajibRetribusiId}
                onDateChange={setDate}
                fields={
                    [
                        {
                            name: 'url_document',
                            label: modalMode === 'edit' ? 'Ganti Bukti Transaksi' : 'Bukti Transaksi (Opsional)',
                            type: 'file',
                            accept: '.jpg,.png',
                            onChange: setBukti,
                        },
                    ]
                }
            />

            <Modal
                title='Hapus Data'
                open={openModalDelete}
                text='Menghapus data transaksi tidak dapat dikembalikan. yakin hapus data ini?'
                action={true}
                onDismiss={true}
                className='btnDanger'
                buttonText='Hapus'
                closeModal={() => setOpenModalDelete(false)}
                onConfirm={() => handleDeleteRow()}
            />
        </>
    );
}