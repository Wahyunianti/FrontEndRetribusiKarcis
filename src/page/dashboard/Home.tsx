import Card from '../components/Card';
import ImageCard from '../components/ImageCard';

export default function Home() {
    return (
        <section id='home' className="sm:p-8">
            <div className="relative flex flex-col-reverse sm:flex-row gap-6">
                <div className=' sm:w-[70%] h-min flex flex-col gap-8 justify-center items-center sm:items-end'>
                    <Card
                        className='p-5 sm:p-10 w-full'
                        title="Selamat Datang di Sistem Informasi Retribusi Karcis"
                        description="SIKARCIS merupakan Sistem Informasi Manajemen Retribusi yang dikelola oleh Dinas Lingkungan Hidup (DLH) Kota Cilegon untuk mendukung proses perekapan, pengelolaan, dan pemantauan retribusi pada setiap zona wajib retribusi.
SIKARCIS berfungsi sebagai media pendataan dan pengendalian retribusi yang memungkinkan DLH Kota Cilegon melakukan pencatatan secara terintegrasi, akurat, dan transparan terhadap kewajiban retribusi di setiap zona, guna meningkatkan efektivitas pengelolaan pendapatan daerah."
                        extraText='SISTEM INFORMASI RETRIBUSI KARCIS DINAS LINGKUNGAN HIDUP KOTA CILEGON'
                    />
                    <div className='relative transition-all duration-300 ease-in-out 
  transform hover:scale-105 active:scale-95 cursor-pointer' onClick={() => window.location.href = '#menu_login'}>
                        <img className='drop-shadow-2xl' src="button-medieval.png" width={300} alt="" />
                        <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                            <span className="text-yellow-100 font-bold text-lg drop-shadow-xl">
                                Login Aplikasi
                            </span>
                        </div>
                    </div>

                </div>

                <ImageCard
                    className='absolute right-0'
                    imageSrc="office.png"
                />

            </div>
        </section>
    );
}