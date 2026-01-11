import DataTableComponent from "../components/DataTableComponent";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchZona, createZona, updateZona, deleteZona } from "../../store/zonaSlice";
import { type RootState, type AppDispatch } from '../../store';
import LoadingPage from '../components/LoadingPage';
import { IoMdAddCircleOutline } from "react-icons/io";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ModalEditTambah from "../components/ModalEditTambah";

interface Zona {
    id: string;
    name: string;
}

type ModalMode = 'create' | 'edit';

export default function DataZona() {

    const dispatch = useDispatch<AppDispatch>();
    const { data3, loading3 } = useSelector((state: RootState) => state.zona);
    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>('create');
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [selectedData, setSelectedData] = useState<Zona | null>(null);
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(fetchZona());
    }, [dispatch]);


    const zona = Array.isArray(data3)
        ? data3
            .filter(Boolean)
            .map((item) => ({
                id: item.id,
                name: item.name,
            }))
        : [];

    const columns = [
        {
            name: 'ID',
            selector: (row: Zona) => row.id,
            width: '80px',
        },
        {
            name: 'Nama Zona',
            selector: (row: Zona) => row.name,
            sortable: true,
        }
    ];

    const openCreateData = () => {
        setModalMode('create');
        setSelectedData(null);
        setName('');
        setOpenModal(true);
    };

    const openEditData = (data: Zona) => {
        setModalMode('edit');
        setSelectedData(data);
        setName(data.name);
        setOpenModal(true);
    };


    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('name', name);
        if (modalMode === 'create') {
            dispatch(createZona(formData))
                .then(() => dispatch(fetchZona()));
        }

        if (modalMode === 'edit' && selectedData) {
            dispatch(updateZona({ id: selectedData.id, formData }))
                .then(() => dispatch(fetchZona()));
        }
        setOpenModal(false);
    };

    const handleDeleteZona = (row: any) => {
        setSelectedData(row);
        setOpenModalDelete(true);
    };

    const handleDeleteRow = () => {
       selectedData && dispatch(deleteZona(selectedData?.id)).then(() => dispatch(fetchZona()));
    }

    return (
        <>
            <div className="w-full flex flex-col gap-10 h-min">
                <div>
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <h2 className="text-2xl font-bold bg-linear-to-r from-lime-800 to-amber-600 bg-clip-text text-transparent">
                            Data Zona
                        </h2>
                        <Button
                            title="Tambah Zona"
                            className="btnPrimary"
                            imageSrc={<IoMdAddCircleOutline />}
                            onClick={() => openCreateData()}
                        />
                    </div>
                    <div className="">
                        {loading3 ?
                            <LoadingPage heigth="h-100" />
                            :
                            <DataTableComponent
                                columns={columns}
                                data={zona}
                                pagination
                                paginationPerPage={10}
                                highlightOnHover
                                striped
                                responsive
                                searchable
                                searchPlaceholder="Cari Nama Zona..."
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
                isFormValid={!!name}
                title={modalMode === 'create' ? 'Tambah Zona' : 'Edit Zona'}
                submitText={modalMode === 'create' ? 'Simpan' : 'Perbarui'}
                fields={
                    [
                        { name: 'name', label: 'Nama', placeholder: 'Masukkan Nama Zona', value: name, onChange: setName },
                    ]
                }
            />

            <Modal
                title='Hapus Data'
                open={openModalDelete}
                text='Menghapus data zona beresiko menghapus data yang lain (pengelola & wajib retribusi). pikirkan kembali !!'
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