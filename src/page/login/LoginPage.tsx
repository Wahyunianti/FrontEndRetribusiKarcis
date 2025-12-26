import Button from "../components/Button"
import Input from "../components/Input"
import { useNavigation } from '../../hooks/useNavigation';

function LoginPage() {
    const { goTo } = useNavigation();
    return (
        <>
            <div className='w-screen backgroundTile overflow-x-hidden relative min-h-screen h-min'>
                <div className="w-full h-dvh p-7 sm:p-20 ">
                    <div className="size-full grid place-items-center">
                        <div className="w-full sm:w-1/2 h-150 bg-white rounded-lg drop-shadow-xl flex flex-row overflow-hidden">
                            <div className="sm:w-1/3 h-full hidden md:grid place-items-center bg-linear-to-b from-lime-100 to-green-200 shadow-xl">
                                <img src="login_page.webp" alt="" />
                            </div>
                            <div className="w-full md:w-2/3 h-full">
                                <div>
                                    <h2 className="font-bold mb-6 mt-10 text-center">Login Aplikasi</h2>
                                    <div>
                                        <form className="flex flex-col gap-3 md:gap-5 px-10">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="username" className="font-semibold">Username</label>
                                                <Input placeholder="Masukkan Username" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="password" className="font-semibold">Password</label>
                                                <Input placeholder="Masukkan Password" />
                                            </div>
                                            <div className="flex flex-col">
                                                <Button
                                                    title="Masuk"
                                                    type="button"
                                                    className='bg-lime-600 hover:bg-lime-700'
                                                />
                                                <Button
                                                    title="Kembali ke Beranda"
                                                    type="button"
                                                    onClick={() => goTo('/')}
                                                    className='bg-gray-800 hover:bg-gray-900'
                                                />
                                            </div>
                                            <div className="grid place-items-center sm:hidden">
                                                <img src="login_page.webp" width={180} alt="" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage