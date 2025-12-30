import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState } from '../../store';
import { logout } from '../../store/authSlice';
import Modal from '../components/Modal';

function DashboardManage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, isOpen] = useState(false);

    const token = useSelector((state: RootState) => state.auth.token);
    //   const handleLogout = () => {
    //     dispatch(logout());
    //   };

    useEffect(() => {
        if (!token) {
            navigate('/', { replace: true });
        }
    }, [token, navigate]);

    return (
        <>
            <div className="w-screen backgroundTile overflow-x-hidden relative min-h-screen h-min">
                <h2 className="text-2xl font-bold p-10">
                    Dashboard Management Page
                </h2>

                <button
                    onClick={() => isOpen(!open)}
                    className="m-10 p-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700 cursor-pointer"
                >
                    Logout
                </button>
            </div>
            {open && <Modal
                title="Logout Confirmation"
                text="Are you sure you want to logout?"
                closeModal={() => {
                    setTimeout(() => isOpen(false), 300);
                }}
                action={true}
                onConfirm={() => dispatch(logout())}
                onDismiss={true}
                buttonText="Logout"
                className='btnDanger'
            />}
        </>

    );
}

export default DashboardManage;
