import DataTableComponent from "../components/DataTableComponent";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchZona } from "../../store/zonaSlice";
import { type RootState, type AppDispatch } from '../../store';
import LoadingPage from '../components/LoadingPage';
import { IoMdAddCircleOutline } from "react-icons/io";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ModalEditTambah from "../components/ModalEditTambah";
import { fetchWajibRetribusi, createWajibRetribusi, deleteWajibRetribusi, updateWajibRetribusi } from "../../store/wajibRetribusiSlice";
import { fetchStatus } from "../../store/statusSlice";
import { fetchJenisKarcis } from "../../store/jenisKarcisSlice";

interface Zona {
    id: string;
    name: string;
}

interface WajibRetribusi {
    id: string;
    name: string;
    keterangan?: string | null;
    zona_id: string;
    zona_name: string;
    status_id: string;
    status_name: string;
    jenis_karcis_id: string;
    jenis_karcis_name: string;
    jenis_karcis_nominal?: number;
    created_at?: string;
}

type ModalMode = 'create' | 'edit';

export default function DataRetribusi() {

    const dispatch = useDispatch<AppDispatch>();
    const { data4, loading4 } = useSelector((state: RootState) => state.retribusi);
    const { data3 } = useSelector((state: RootState) => state.zona);
    const { data5 } = useSelector((state: RootState) => state.status);
    const { data } = useSelector((state: RootState) => state.jenisKarcis);


    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>('create');
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [selectedData, setSelectedData] = useState<Zona | null>(null);
    const [name, setName] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [zona_id, setZonaId] = useState('');
    const [status_id, setStatusId] = useState('');
    const [jenis_karcis_id, setJenisKarcisId] = useState('');


    useEffect(() => {
        dispatch(fetchZona());
        dispatch(fetchStatus());
        dispatch(fetchJenisKarcis());
        dispatch(fetchWajibRetribusi());
    }, [dispatch]);


    const retribusi = Array.isArray(data4)
        ? data4
            .filter(Boolean)
            .map((item) => ({
                id: item.id,
                name: item.name,
                keterangan: item.keterangan,
                zona_id: item.zona_id,
                zona_name: item.zona_name,
                status_id: item.status_id,
                status_name: item.status_name,
                jenis_karcis_id: item.jenis_karcis_id,
                jenis_karcis_name: item.jenis_karcis_name,
                jenis_karcis_nominal: item.jenis_karcis_nominal,
            }))
        : [];

    const columns = [
        { name: 'ID', cell: (_row: any, index: number) => index + 1, width: '7%' },
        {
            name: 'Nama',
            selector: (row: WajibRetribusi) => row.name,
            sortable: true,
            wrap: true
        },
        {
            name: 'Keterangan',
            selector: (row: WajibRetribusi) => row.keterangan ? row.keterangan : '-',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Status',
            selector: (row: WajibRetribusi) => row.status_name
        },
        {
            name: 'Zona',
            selector: (row: WajibRetribusi) => row.zona_name
        },
        {
            name: 'Jenis Karcis',
            selector: (row: WajibRetribusi) => row.jenis_karcis_name,
            wrap: true
        },
        {
            name: 'Nominal',
            selector: (row: WajibRetribusi) => row.jenis_karcis_nominal,
            cell: (row: WajibRetribusi) => `Rp ${row.jenis_karcis_nominal?.toLocaleString()}`,
            sortable: true,
        }
    ];

    const openCreateData = () => {
        setModalMode('create');
        setSelectedData(null);
        setName('');
        setOpenModal(true);
    };

    const openEditData = (data: WajibRetribusi) => {
        setModalMode('edit');
        setSelectedData(data);
        setName(data.name);
        setKeterangan(data.keterangan ? data.keterangan : '');
        setZonaId(data.zona_id);
        setStatusId(data.status_id);
        setJenisKarcisId(data.jenis_karcis_id);
        setOpenModal(true);
    };


    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('zona_id', String(zona_id));
        formData.append('status_id', String(status_id));
        formData.append('jenis_karcis_id', String(jenis_karcis_id));
        formData.append('keterangan', keterangan);
        if (modalMode === 'create') {
            dispatch(createWajibRetribusi(formData))
                .then(() => dispatch(fetchWajibRetribusi()));
        }

        if (modalMode === 'edit' && selectedData) {
            dispatch(updateWajibRetribusi({ id: selectedData.id, formData }))
                .then(() => dispatch(fetchWajibRetribusi()));
        }
        setOpenModal(false);
    };

    const handleDeleteZona = (row: any) => {
        setSelectedData(row);
        setOpenModalDelete(true);
    };

    const handleDeleteRow = () => {
        selectedData && dispatch(deleteWajibRetribusi(selectedData?.id)).then(() => dispatch(fetchWajibRetribusi()));
    }

    return (
        <>
            <div className="w-full flex flex-col gap-10 h-min">
                <div>
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <h2 className="text-2xl font-bold bg-linear-to-r from-lime-800 to-amber-600 bg-clip-text text-transparent">
                            Data Wajib Retribusi
                        </h2>
                        <Button
                            title="Tambah Wajib Retribusi"
                            className="btnPrimary"
                            imageSrc={<IoMdAddCircleOutline />}
                            onClick={() => openCreateData()}
                        />
                    </div>
                    <div className="">
                        {loading4 ?
                            <LoadingPage heigth="h-100" />
                            :
                            <DataTableComponent
                                columns={columns}
                                data={retribusi}
                                pagination
                                paginationPerPage={10}
                                highlightOnHover
                                striped
                                responsive
                                searchable
                                searchPlaceholder="Cari Nama Wajib Retribusi..."
                                onEdit={(row: any) => openEditData(row)}
                                onDelete={(row: any) => handleDeleteZona(row)}
                            />
                        }
                    </div>
                </div>
            </div>


            <ModalEditTambah
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleSubmit}
                isFormValid={!!name && !!zona_id && !!status_id && !!jenis_karcis_id}
                title={modalMode === 'create' ? 'Tambah Wajib Retribusi' : 'Edit Wajib Retribusi'}
                submitText={modalMode === 'create' ? 'Simpan' : 'Perbarui'}
                fields={
                    [
                        { name: 'name', label: 'Nama', placeholder: 'Masukkan Nama Wajib Retribusi', value: name, onChange: setName },
                        {
                            name: 'jenis_karcis_id',
                            label: 'Jenis Karcis',
                            type: 'select',
                            value: String(jenis_karcis_id),
                            options: data.map((j) => ({
                                label: j.name,
                                value: String(j.id),
                            })),
                            onChange: setJenisKarcisId,
                        },
                        {
                            name: 'zona_id',
                            label: 'Zona',
                            type: 'select',
                            value: String(zona_id),
                            options: data3.map((z) => ({
                                label: z.name,
                                value: String(z.id),
                            })),
                            onChange: setZonaId,
                        },
                        {
                            name: 'status_id',
                            label: 'Status',
                            type: 'select',
                            value: String(status_id),
                            options: data5.map((s) => ({
                                label: s.name,
                                value: String(s.id),
                            })),
                            onChange: setStatusId,
                        },
                        { name: 'keterangan', label: 'Keterangan (opsional)', placeholder: 'Masukkan Keterangan', value: keterangan, onChange: setKeterangan },
                    ]
                }
            />

            <Modal
                title='Hapus Data'
                open={openModalDelete}
                text='Menghapus data wajib retribusi beresiko menghapus input retribusi bulanannya. pikirkan kembali !!'
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