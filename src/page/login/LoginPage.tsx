import { useEffect, useState } from 'react';
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigation } from '../../hooks/useNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { type RootState, type AppDispatch } from '../../store';
import GlobalErrorModal from '../components/GlobalErrorModal';
import '../../services/interceptor';


function LoginPage() {
    const { goTo } = useNavigation();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, token } = useSelector(
        (state: RootState) => state.auth
    );

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(login({
            email,
            password,
        }));
    };

    useEffect(() => {
        if (token) {
            goTo('/dashboard');
        }
    }, [token]);

    return (
        <>
            <div className='w-screen backgroundTile overflow-x-hidden relative min-h-screen h-min'>
                <div className="w-full h-dvh p-7 sm:p-20">
                    <div className="size-full grid place-items-center">
                        <div className="w-full sm:w-1/2 min-h-150 h-min sm:h-150 bg-white rounded-lg drop-shadow-xl flex flex-row overflow-hidden">

                            <div className="sm:w-1/3 h-full hidden md:grid place-items-center bg-linear-to-b from-lime-100 to-green-200 shadow-xl">
                                <img src="login_page.webp" alt="" />
                            </div>

                            <div className="w-full md:w-2/3 h-full">
                                <h2 className="font-bold mb-6 mt-10 text-center">
                                    Login Aplikasi
                                </h2>

                                <form
                                    onSubmit={handleLogin}
                                    className="flex flex-col gap-3 md:gap-5 px-10"
                                >
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold">Email</label>
                                        <Input
                                            placeholder="Masukkan Email"
                                            value={email}
                                            onChange={(e: any) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold">Password</label>
                                        <Input
                                            type="password"
                                            placeholder="Masukkan Password"
                                            value={password}
                                            onChange={(e: any) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-red-600 text-sm text-center">
                                            {error}
                                        </p>
                                    )}

                                    <div className="flex flex-col gap-2">
                                        <Button
                                            title={loading ? 'Memproses...' : 'Masuk'}
                                            type="submit"
                                            disabled={loading}
                                            className="bg-lime-600 hover:bg-lime-700"
                                        />
                                        <Button
                                            title="Kembali ke Beranda"
                                            type="button"
                                            onClick={() => goTo('/')}
                                            className="bg-gray-800 hover:bg-gray-900"
                                        />
                                    </div>

                                    <div className="grid place-items-center sm:hidden mb-5">
                                        <img src="login_page.webp" width={180} alt="" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                  <GlobalErrorModal />
        
        </>

    );
}

export default LoginPage;
