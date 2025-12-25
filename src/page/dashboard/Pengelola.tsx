import { FaExternalLinkAlt } from "react-icons/fa";

export default function Pengelola() {

    const imageUrl = [
        'avatar/eagle.png',
        'avatar/cool-.png',
        'avatar/polar-bear.png',
        'avatar/sloth.png',
    ]

    const getRandomImage = () => {
        return imageUrl[Math.floor(Math.random() * imageUrl.length)];
    };

    const pengelolaData = [
        {
            id: 1,
            name: 'Robby Sande',
            position: 'Administrator',
            file: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            name: 'SP Muhtar Kamaludin',
            position: 'Zona 1',
            file: 'https://via.placeholder.com/150'
        },
    ]

    return (
        <section id='pengelola' className="sm:p-8">
            <div className='flex flex-row gap-2 items-center'>
                <h2 className="text-2xl font-bold mb-4">Pengelola</h2>
                <img src="daun2.gif" className='mb-4 rotate-45' width={40} alt="" />
            </div>

            <div className="flex w-full flex-col items-center sm:items-start gap-6 sm:flex-row h-min p-2">

                {pengelolaData.map((item) => (
                    <div className="w-60 h-min bg-white hover:shadow-2xl cursor-pointer transition-shadow rounded-xl shadow-xl flex flex-col gap-5 p-3">
                        <div className="w-full h-min py-3 bg-lime-50 grid place-items-center">
                            <img src={getRandomImage()} alt="" />
                        </div>
                        <div className="grid place-items-center gap-3 py-4">
                            <p className="text-center font-bold text-lg">{item.name}</p>
                            <p className="text-center font-semibold bg-lime-200 p-2 rounded-lg px-3">{item.position}</p>
                            <a className="text-center flex flex-row gap-2 items-center linkFile" target="_blank" href={item.file} style={{ fontSize: '14px' }}>Link File (Surat Tugas) <span className=""><FaExternalLinkAlt /></span></a>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}