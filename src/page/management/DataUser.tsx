import DataTableComponent from "../components/DataTableComponent";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
} from "../../store/userSlice";
import {
    fetchPengawas,
    createPengawas,
    updatePengawas,
    deletePengawas
} from "../../store/pengawasSlice";
import { type RootState, type AppDispatch } from '../../store';
import LoadingPage from '../components/LoadingPage';
import ModalEditTambah from "../components/ModalEditTambah";
import Modal from "../components/Modal";
import { fetchZona } from "../../store/zonaSlice";
import { ENV } from "../../config/env";
import { FaExternalLinkAlt } from "react-icons/fa";

interface User {
    id: string;
    name: string;
    email: string;
}

interface Pengawas {
    id: string;
    name: string;
    nik: string;
    users_id: string;
    zona_name: string;
    zona_id: string;
    surat_tugas?: string | null;
}

type ModalTarget = 'user' | 'pengawas';
type ModalMode = 'create' | 'edit';


export default function DataUser() {
    const dispatch = useDispatch<AppDispatch>();

    const { data: users, loading } = useSelector((state: RootState) => state.user);
    const { data2: pengawas, loading2 } = useSelector((state: RootState) => state.pengawas);
    const { data3 } = useSelector((state: RootState) => state.zona);

    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>('create');
    const [modalTarget, setModalTarget] = useState<ModalTarget>('user');
    const [zonaId, setZonaId] = useState<string | ''>('');
    const [idData, setId] = useState<string | ''>('');
    const [isUser, setIsUser] = useState<boolean>(false);


    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedPengawas, setSelectedPengawas] = useState<Pengawas | null>(null);

    const [name, setName] = useState('');
    const [nik, setNik] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [suratTugas, setSuratTugas] = useState<File | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchPengawas());
        dispatch(fetchZona());
    }, []);

    const cekFormUser = () => {
        if (modalMode === 'edit') {
            return !!name && !!email;
        }
        return !!name && !!email && !!password;
    };

    const cekFormPengelola = () => {
        return !!name && !!nik && !!zonaId;
    };

    const openCreateUser = () => {
        setModalTarget('user');
        setModalMode('create');
        setSelectedUser(null);
        setName('');
        setEmail('');
        setPassword('');
        setOpenModal(true);
    };

    const openEditUser = (user: User) => {
        setModalTarget('user');
        setModalMode('edit');
        setSelectedUser(user);
        setName(user.name);
        setEmail(user.email);
        setPassword('');
        setOpenModal(true);
    };

    const openCreatePengawas = () => {
        setModalTarget('pengawas');
        setModalMode('create');
        setSelectedPengawas(null);
        setNik('');
        setName('');
        setZonaId('');
        setSuratTugas(null);
        setOpenModal(true);
    };

    const openEditPengawas = (row: Pengawas & { zona_id?: string }) => {
        setModalTarget('pengawas');
        setModalMode('edit');
        setSelectedPengawas(row);
        setNik(row.nik);
        setName(row.users_id);
        setZonaId(row.zona_id ?? '');
        setSuratTugas(null);
        setOpenModal(true);
    };

    const handleSubmit = () => {
        if (modalTarget === 'user') {
            if (modalMode === 'create') {
                dispatch(createUser({ name, email, password }))
                    .then(() => dispatch(fetchUsers()));
            }

            if (modalMode === 'edit' && selectedUser) {
                dispatch(updateUser({
                    id: String(selectedUser.id),
                    name,
                    email,
                    password: password || undefined,
                })).then(() => dispatch(fetchUsers()));
            }
        }

        if (modalTarget === 'pengawas') {
            const formData = new FormData();
            formData.append('users_id', name);
            formData.append('nik', nik);
            formData.append('zona_id', String(zonaId));
            if (suratTugas) formData.append('surat_tugas', suratTugas);

            if (modalMode === 'create') {
                dispatch(createPengawas(formData))
                    .then(() => dispatch(fetchPengawas()));
            }

            if (modalMode === 'edit' && selectedPengawas) {
                dispatch(updatePengawas({ id: selectedPengawas.id, formData }))
                    .then(() => dispatch(fetchPengawas()));
            }
        }

        setOpenModal(false);
    };

    const handleDeleteUser = (row: any, is_user: boolean) => {
        if (!row.name) return;
        setId(row.id)
        is_user ? setIsUser(true) : setIsUser(false);
        setOpenModalDelete(true);
    };

    const handleDeleteRow = () => {
        if (isUser) {
            dispatch(deleteUser(idData)).then(() => dispatch(fetchPengawas()));
        } else {
            dispatch(deletePengawas(idData)).then(() => dispatch(fetchPengawas()));
        }
        setTimeout(() => setOpenModal(false), 300);
        setOpenModalDelete(false);
    }

    const userData = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
    }));

    const pengawasData = Array.isArray(pengawas)
        ? pengawas
            .filter(Boolean)
            .map((p) => ({
                id: p.id,
                name: p.name,
                nik: p.nik,
                users_id: p.users_id,
                zona_id: p.zona_id,
                position: p.zona_name ?? 'Administrator',
                file: p.surat_tugas ?? '-',
            }))
        : [];

    const columnsUser = [
        { name: 'ID', cell: (_row: any, index: number) => index + 1, width: '80px' },
        { name: 'Nama', selector: (r: User) => r.name, sortable: true },
        { name: 'Email', selector: (r: User) => r.email },
    ];

    const columnsPengawas = [
        { name: 'ID', cell: (_row: any, index: number) => index + 1, width: '80px' },
        { name: 'Nama', selector: (r: any) => r.name, sortable: true },
        { name: 'Nik', selector: (r: any) => r.nik },
        { name: 'Zona', selector: (r: any) => r.position },
        { name: 'Surat Tugas', cell: (r: any) => r.file && r.file !== '-' ? <a href={`${ENV.FILE_URL}/${r.file}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 underline flex flex-row gap-1 xl:gap-2 items-center" style={{fontSize: '12px'}}>Lihat Surat Tugas <span><FaExternalLinkAlt size={12} className="text-blue-700" /></span></a> : '-', wrap:true },
    ];


    return (
        <>
            <div className="w-full flex flex-col gap-10">
                <section>
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <h2 className="text-2xl font-bold bg-linear-to-r from-lime-800 to-amber-600 bg-clip-text text-transparent">
                            Data Pengguna
                        </h2>
                        <Button
                            title="Tambah User"
                            className="btnPrimary"
                            imageSrc={<IoMdAddCircleOutline />}
                            onClick={openCreateUser}
                        />
                    </div>

                    {loading ? (
                        <LoadingPage heigth="h-40" />
                    ) : (
                        <DataTableComponent
                            columns={columnsUser}
                            data={userData}
                            searchPlaceholder='Cari Nama User'
                            searchable
                            onEdit={openEditUser}
                            onDelete={(row: any) => handleDeleteUser(row, true)}
                        />
                    )}
                </section>

                <section>
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <h2 className="text-2xl font-bold bg-linear-to-r from-lime-800 to-amber-600 bg-clip-text text-transparent">
                            Data Pengelola Retribusi
                        </h2>
                        <Button
                            title="Tambah Pengelola"
                            className="btnPrimary"
                            imageSrc={<IoMdAddCircleOutline />}
                            onClick={openCreatePengawas}
                        />
                    </div>

                    {loading2 ? (
                        <LoadingPage heigth="h-40" />
                    ) : (
                        <DataTableComponent
                            columns={columnsPengawas}
                            data={pengawasData}
                            searchPlaceholder='Cari Nama Pengelola'
                            searchable
                            onEdit={openEditPengawas}
                            onDelete={(row: any) => handleDeleteUser(row, false)}
                        />
                    )}
                </section>
            </div>

            <ModalEditTambah
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleSubmit}
                isFormValid={modalTarget === 'user' ? cekFormUser() : cekFormPengelola()}
                title={
                    modalTarget === 'user'
                        ? modalMode === 'create' ? 'Tambah User' : 'Edit User'
                        : modalMode === 'create' ? 'Tambah Pengelola' : 'Edit Pengelola'
                }
                submitText={modalMode === 'create' ? 'Simpan' : 'Perbarui'}
                fields={
                    modalTarget === 'user'
                        ? [
                            { name: 'name', label: 'Nama', placeholder: 'Masukkan Nama', value: name, onChange: setName },
                            { name: 'email', label: 'Email', placeholder: 'Masukkan Email', type: 'email', value: email, onChange: setEmail },
                            {
                                name: 'password',
                                label: modalMode === 'edit' ? 'Password (Opsional)' : 'Password',
                                type: 'password',
                                value: password,
                                onChange: setPassword,
                            },
                        ]
                        : [
                            {
                                name: 'users_id',
                                label: 'Nama Pengguna',
                                type: 'select',
                                value: String(name),
                                options: users.map((z) => ({
                                    label: z.name,
                                    value: String(z.id),
                                })),
                                onChange: setName,
                            },
                            { name: 'nik', label: 'NIK', placeholder: 'Masukkan NIK', value: nik, onChange: setNik },
                            {
                                name: 'zona_id',
                                label: 'Zona',
                                type: 'select',
                                value: String(zonaId),
                                options: data3.map((z) => ({
                                    label: z.name,
                                    value: String(z.id),
                                })),
                                onChange: setZonaId,
                            },
                            {
                                name: 'surat',
                                label: modalMode === 'edit' ? 'Ganti File' : 'Surat Tugas',
                                type: 'file',
                                accept: '.pdf,.jpg,.png',
                                onChange: setSuratTugas,
                            },
                        ]
                }
            />

            <Modal
                title='Hapus Data'
                open={openModalDelete}
                text='Anda Yakin Hapus Data Ini ?'
                action={true}
                onDismiss={true}
                className='btnDanger'
                buttonText='Oke'
                closeModal={() => setOpenModalDelete(false)}
                onConfirm={() => handleDeleteRow()}
            />
        </>
    );
}
