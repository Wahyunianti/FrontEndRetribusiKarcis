import { FaExternalLinkAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { fetchPengawas } from "../../store/pengawasSlice";
import { useEffect } from "react";
import LoadingPage from "../components/LoadingPage";
import { ENV } from "../../config/env";


interface Pengawas {
    id: string;
    name: string;
    nik: string;
    users_id: string;
    zona_name: string;
    zona_id: string;
    surat_tugas?: string | null;
}

export default function Pengelola() {
    const dispatch = useDispatch<AppDispatch>();
    const { data2: pengawas, loading2 } = useSelector((state: RootState) => state.pengawas);
    const pengelolaData = Array.isArray(pengawas)
        ? pengawas
            .filter(Boolean)
            .map((p: Pengawas) => ({
                id: p.id,
                name: p.name,
                nik: p.nik,
                users_id: p.users_id,
                zona_id: p.zona_id,
                position: p.zona_name ?? 'Administrator',
                file: p.surat_tugas ?? '-',
            }))
        : [];

    const imageUrl = [
        'avatar/eagle.png',
        'avatar/cool-.png',
        'avatar/polar-bear.png',
        'avatar/sloth.png',
    ]

    const getRandomImage = () => {
        return imageUrl[Math.floor(Math.random() * imageUrl.length)];
    };

    useEffect(() => {
        dispatch(fetchPengawas());
    }, []);

    return (
        <section id='pengelola' className="sm:p-8">
            <div className='flex flex-row gap-2 items-center'>
                <h2 className="text-2xl font-bold mb-4">Pengelola</h2>
                <img src="daun2.gif" className='mb-4 rotate-45' width={40} alt="" />
            </div>

            <div className="flex w-full flex-col items-center sm:items-start gap-6 sm:flex-row h-min p-2">
                {loading2 ? <LoadingPage heigth='h-82' /> :
                    pengelolaData.map((item) => (
                        <div className="w-[80%] xl:w-60 h-min bg-white hover:shadow-2xl cursor-pointer transition-shadow rounded-xl shadow-xl flex flex-col gap-5 p-3">
                            <div className="w-full h-min py-3 bg-lime-50 grid place-items-center">
                                <img src={getRandomImage()} alt="" />
                            </div>
                            <div className="grid place-items-center gap-3 py-4">
                                <p className="text-center font-bold text-lg">{item.name}</p>
                                <p className="text-center font-semibold bg-lime-200 p-2 rounded-lg px-3">{item.position}</p>
                                <a className="text-center flex flex-row gap-2 items-center linkFile" target="_blank" href={`${ENV.FILE_URL}/${item.file}`} style={{ fontSize: '14px' }}>Link File (Surat Tugas) <span className=""><FaExternalLinkAlt /></span></a>
                            </div>
                        </div>
                    ))
                }

            </div>
        </section>
    );
}