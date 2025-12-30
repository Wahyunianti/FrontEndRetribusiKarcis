import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { closeError } from '../../store/globalErrorSlice';
import Modal from './Modal';

export default function GlobalErrorModal() {
    const dispatch = useDispatch();
    const { open, message, status } = useSelector(
        (state: RootState) => state.globalError
    );

    if (!open || !message) {
        return null;
    };

    return (
        <>
            {open &&
                <Modal
                    title="Terjadi Kesalahan"
                    text={message}
                    action={true}
                    onConfirm={() => dispatch(closeError())}
                    buttonText='Oke'
                    className='btnDanger'
                />
            }
        </>

    );
}
