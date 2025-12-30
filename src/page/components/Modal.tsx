import React, { act } from 'react';
import { useState, useEffect } from 'react';
import Button from './Button';

interface ModalProps {
    title: string;
    text?: string;
    closeModal?: () => void;
    onConfirm?: () => void;
    onDismiss?: boolean;
    action?: boolean;
    buttonText?: string;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({ title, text, closeModal, onConfirm, onDismiss, buttonText, action, className }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setTimeout(() => setIsVisible(false), 300);
    };

    const handleConfirm = () => {
        setTimeout(() => setIsVisible(false), 300);
    };

    return (
        <div
            className={`modalPopupAction ${isVisible ? 'showModal' : 'hideModal'}`}>
            <div className={`isiModalsTambah p-5 sm:min-w-1/4 ${isVisible ? 'show' : 'hide'}`}>
                <div className='w-full flex flex-row border-b justify-center items-center'>
                    <h2>{title}</h2>
                </div>
                <div className='flex flex-col gap-3 p-6 w-full min-h-32 items-center'>
                    {text && (
                        <p>{text}</p>
                    )}
                </div>
                {action &&
                    <div className='w-full flex flex-row justify-between gap-4'>
                        {onDismiss &&
                            <Button
                                title="Batal"
                                className={`w-full btnBlack`}
                                onClick={() => {
                                    handleClose();
                                    setTimeout(() => closeModal && closeModal(), 300);
                                }}
                            />
                        }
                        <Button
                            title={buttonText || "Konfirmasi"}
                            className={`w-full ${className ? className : 'bg-lime-600 hover:bg-lime-700'} text-white`}
                            onClick={() => {
                                handleConfirm();
                                setTimeout(() => onConfirm && onConfirm(), 300);
                            }}
                        />
                    </div>

                }
            </div>
        </div>
    );
};

export default Modal;
