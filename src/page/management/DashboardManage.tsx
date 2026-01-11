import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState } from '../../store';
import { IoIosArrowBack } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { FaStore } from "react-icons/fa";
import Button from '../components/Button';
import { FaSignOutAlt } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import Modal from '../components/Modal';
import { RiTimeZoneFill } from "react-icons/ri";
import type { IconType } from 'react-icons';
import { FaMoneyBillWave } from "react-icons/fa6";

interface MenuItem {
    label: string;
    path: string;
    icon: IconType;
}

function DashboardManage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [open, setIsOpen] = useState(true);
    const [showIndicator, setShowIndicator] = useState(false);

    const token = useSelector((state: RootState) => state.auth.token);
    const handleLogout = () => {
        dispatch(logout());
    };

    const baseclassName =
        "flex flex-row gap-2 items-center hover:bg-linear-to-r hover:from-amber-200 hover:border-l-4 border-amber-300 hover:px-2 py-1 transition-all cursor-pointer text-black";

    const activeclassName =
        "bg-linear-to-r text-lime-800 from-amber-200 border-l-4 px-2";

    const inactiveclassName =
        "text-lime-800";

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const items: MenuItem[] = [
        {
            label: 'User',
            path: '/dashboard/users',
            icon: FaUser,
        },
        {
            label: 'Zona',
            path: '/dashboard/zona',
            icon: RiTimeZoneFill,
        },
        {
            label: 'Transaksi',
            path: '/dashboard/transaksi',
            icon: FaMoneyBillWave,
        },
        {
            label: 'Karcis',
            path: '/dashboard/karcis',
            icon: IoTicket,
        },
        {
            label: 'Retribusi',
            path: '/dashboard/retribusi',
            icon: FaStore,
        }
    ];
    useEffect(() => {
        if (activeIndex === null) {
            setActiveIndex(2);
            setShowIndicator(true);
        }
        if (!token) {
            navigate('/', { replace: true });
        }
    }, [token, navigate]);

    return (
        <>
            <div className="w-screen backgroundTile overflow-hidden relative min-h-screen">
                <div className='h-14 w-full fixed bg-lime-200 z-100 drop-shadow-xl drop-shadow-lime-600/50 flex xl:hidden items-center px-5 lg:px-10'>
                    <h3 onClick={() => setOpenModal(true)} className='cursor-pointer' style={{fontSize : '24px'}}>LOGOUT</h3>
                </div>
                <div className='w-full h-full mt-14 xl:mt-0 flex flex-row'>

                    <div className={`min-h-screen hidden xl:block relative ${open ? 'w-[18%]' : 'w-[4%]'} transition-all duration-300 ease-in-out overflow-hidden z-0`}>
                        <div className='size-14 z-0 absolute right-3 top-2 grid place-items-center'>
                            <div onClick={() => setIsOpen(!open)} className='size-14 text-white hover:text-amber-100 cursor-pointer bg-linear-to-br from-amber-300/50 bg-lime-700 hover:bg-lime-800 transition-all rounded-full grid place-items-center shadow-lg'>
                                <IoIosArrowBack className={`size-8 transition-all duration-300 ease-in-out ${open ? '' : 'rotate-180'}`} />
                            </div>
                        </div>
                        <div className={` ${open ? 'w-[87%]' : 'w-0'} h-full transition-all duration-200 ease-in-out rounded-br-3xl rounded-tr-3xl bg-linear-to-b from-amber-100  bg-lime-200 shadow-xl shadow-amber-700/50 border-r border-lime-100 overflow-hidden`}>
                            <div className='relative w-full h-full p-3'>
                                <div className='w-60 mt-4 h-full flex flex-col gap-5 overflow-hidden'>
                                    <div className='w-full h-16 grid place-items-center rounded-2xl bg-linear-to-br from-red-400/30 bg-amber-200 shadow-lg'>
                                        <h3 className='bg-linear-to-r from-lime-800 to-lime-900 bg-clip-text text-transparent'>Retribusi dlh</h3>
                                    </div>
                                    <div className='w-full flex flex-col gap-5 h-min mt-4 px-2'>
                                        <NavLink
                                            to="/dashboard/users"
                                            className={({ isActive }) =>
                                                `${baseclassName} ${isActive ? activeclassName : inactiveclassName}`
                                            }
                                        >
                                            <FaUser className='size-6' />
                                            <h3 style={{ fontSize: '22px' }} className='capitalize changa text-lime-900'>Data User</h3>
                                        </NavLink>

                                        <NavLink
                                            to="/dashboard/zona"
                                            className={({ isActive }) =>
                                                `${baseclassName} ${isActive ? activeclassName : inactiveclassName}`
                                            }
                                        >
                                            <RiTimeZoneFill className='size-6 ' />
                                            <h3 style={{ fontSize: '22px' }} className='capitalize changa '>Data Zona</h3>
                                        </NavLink>

                                        <NavLink
                                            to="/dashboard/karcis"
                                            className={({ isActive }) =>
                                                `${baseclassName} ${isActive ? activeclassName : inactiveclassName}`
                                            }
                                        >
                                            <IoTicket className='size-6 ' />
                                            <h3 style={{ fontSize: '22px' }} className='capitalize changa '>Data Jenis Karcis</h3>
                                        </NavLink>

                                        <NavLink
                                            to="/dashboard/retribusi"
                                            className={({ isActive }) =>
                                                `${baseclassName} ${isActive ? activeclassName : inactiveclassName}`
                                            }
                                        >
                                            <FaStore className='size-6' />
                                            <h3 style={{ fontSize: '22px' }} className='capitalize changa text-lime-900'>Data Retribusi</h3>
                                        </NavLink>
                                        <NavLink
                                            to="/dashboard/transaksi"
                                            className={({ isActive }) =>
                                                `${baseclassName} ${isActive ? activeclassName : inactiveclassName}`
                                            }
                                        >
                                            <FaMoneyBillWave className='size-6' />
                                            <h3 style={{ fontSize: '22px' }} className='capitalize changa text-lime-900'>Data Transaksi</h3>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className='absolute w-60 bottom-8 h-min flex'>
                                    <Button
                                        title="Logout"
                                        onClick={() => setOpenModal(true)}
                                        className='btnPrimary w-full'
                                        imageSrc={<FaSignOutAlt />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${open ? 'w-full xl:w-[84%]' : 'w-full xl:w-[96%] lg:pl-24'} min-h-screen fixed right-0 h-full z-1 overflow-y-auto transition-all duration-300 ease-in-out py-10 px-5 lg:px-10`}>
                        <div className='w-full min-h-screen h-min pb-30 relative'>
                            <Outlet />
                        </div>
                    </div>


                </div>
                <div className="navbar-mobile grid xl:hidden z-0">
                    <ul>
                        {items.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <li
                                    key={item.label}
                                    className={`list ${activeIndex === index ? 'active' : ''}`}
                                >
                                    <NavLink
                                        to={item.path}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveIndex(index);
                                            setShowIndicator(true);
                                        }}
                                    >
                                        <span className="icon">
                                            <Icon className="size-5" />
                                        </span>
                                        <span className="text">
                                            {item.label}
                                        </span>
                                    </NavLink>
                                </li>
                            );
                        })}

                        {showIndicator && <div className="indicator"></div>}
                    </ul>
                </div>

            </div>

            <Modal
                title='Logout'
                open={openModal}
                text='Anda Yakin Mau Keluar ?'
                action={true}
                onDismiss={true}
                className='btnDanger'
                buttonText='Oke'
                closeModal={() => {
                    setTimeout(() => setOpenModal(false), 300);
                }}
                onConfirm={() => {
                    handleLogout();
                    setTimeout(() => setOpenModal(false), 300);
                }
                }
            />

        </>

    );
}

export default DashboardManage;
