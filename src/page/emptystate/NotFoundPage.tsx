import Button from "../components/Button"
import { useNavigation } from '../../hooks/useNavigation';

function NotFoundPage() {
    const { goTo } = useNavigation();
    return (
        <>
            <div className='w-screen bg-white backgroundTile overflow-x-hidden relative min-h-screen h-vdh grid place-items-center'>
                <div>
                    <div className="grid place-items-center">
                        <img src="not-found-404.webp" className="w-[80%]" alt="" />
                    </div>
                    <h3 className="text-center my-3">404 - Halaman Tidak Ditemukan</h3>
                    <div className="grid place-items-center">
                        <Button
                            title="Kembali ke Beranda"
                            type="button"
                            onClick={() => goTo('/')}
                            className='bg-gray-800 hover:bg-gray-900'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage