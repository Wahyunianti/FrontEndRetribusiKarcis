import React, { useCallback, useEffect, useState } from 'react';
import Button from './Button';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import SelectFieldComponent from './SelectFieldComponent';
import SelectWajibRetribusi from './SelectWajibRetribusi';
import { clearWajibRetribusiDetail, fetchWajibRetribusiDetail } from '../../store/wajibRetribusiSlice';
import type { RootState } from '../../store';

type FieldOption = {
    value: string;
    label: string;
};

type BaseField = {
    name: string;
    label: string;
    placeholder?: string;
};

type TextField = BaseField & {
    type?: 'text' | 'password' | 'email';
    value: string;
    onChange: (value: string) => void;
};

type TextAreaField = BaseField & {
    type: 'textarea';
    value: string;
    onChange: (value: string) => void;
};

type SelectField = BaseField & {
    type: 'select';
    value: string;
    options: FieldOption[];
    onChange: (value: string) => void;
};

type FileField = BaseField & {
    type: 'file';
    accept?: string;
    value?: File | null;
    onChange: (file: File | null) => void;
};

export type ModalField =
    | TextField
    | TextAreaField
    | SelectField
    | FileField;

interface ModalEditTambahProps {
    title: string;
    open: boolean;
    isFormValid?: boolean;
    isTransaction?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    onSelectChange?: (value: string) => void;
    onDateChange?: (value: string) => void;
    fields: ModalField[];
    submitText?: string;
    submitClassName?: string;
}

const ModalEditTambah: React.FC<ModalEditTambahProps> = ({
    title,
    open,
    onClose,
    onSubmit,
    fields,
    submitText = 'Simpan',
    submitClassName,
    isFormValid = true,
    isTransaction = false,
    onSelectChange,
    onDateChange,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const wajibRetribusiDetail = useSelector((state: RootState) => state.retribusi);
    const formatDateTime = (date: Date) => {
        const pad = (n: number) => String(n).padStart(2, '0');

        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
            date.getDate()
        )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
            date.getSeconds()
        )}`;
    };


    const [isVisible, setIsVisible] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [dateType, setDateType] = useState<'today' | 'month'>('today');
    const [transactionDate, setTransactionDate] = useState<string>(formatDateTime(new Date()));
    const [selectedMonth, setSelectedMonth] = useState<{ value: string; label: string } | null>(null);

    const monthOptions = [
        { value: '01', label: 'Januari' },
        { value: '02', label: 'Februari' },
        { value: '03', label: 'Maret' },
        { value: '04', label: 'April' },
        { value: '05', label: 'Mei' },
        { value: '06', label: 'Juni' },
        { value: '07', label: 'Juli' },
        { value: '08', label: 'Agustus' },
        { value: '09', label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'Desember' },
    ];


    useEffect(() => {
        if (open) setIsVisible(true);
    }, [open]);

    useEffect(() => {
        const now = new Date();

        if (dateType === 'today') {
            setTransactionDate(formatDateTime(now));
            onDateChange && onDateChange(formatDateTime(now));
        }

        if (dateType === 'month' && selectedMonth) {
            const monthIndex = Number(selectedMonth.value) - 1;
            const newDate = new Date(now);

            newDate.setMonth(monthIndex);
            setTransactionDate(formatDateTime(newDate));
        }
    }, [dateType, selectedMonth]);

 
    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const debouncedSetKeyword = useCallback(
        (val: string) => {
            const timeoutId = setTimeout(() => {
                setKeyword(val);
            }, 300);
            return () => clearTimeout(timeoutId);
        },
        []
    );

    const handleSelectWajibRetribusi = (val: string) => {
        if (val) {
            dispatch(fetchWajibRetribusiDetail(val));
        } else {
            dispatch(clearWajibRetribusiDetail());
        }
    };

    if (!open) return null;

    return (
        <div className={`modalPopupAction z-9999 ${isVisible ? 'showModal' : 'hideModal'}`}>
            <div className={`isiModalsTambah h-min max-h-3/4 modals overflow-y-auto p-5 m-5 w-[90%] xl:w-1/3 ${isVisible ? 'show' : 'hide'}`}>

                <div className="w-full flex border-b justify-center pb-3">
                    <h2 className="text-lg font-bold">{title}</h2>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!isFormValid) return;
                        onSubmit();
                    }}
                    className="flex flex-col gap-4 py-5 xl:p-6 p-2"
                >
                    {isTransaction &&
                        <div className="flex flex-col gap-4">
                            <div className="text-sm text-gray-600">
                                Tanggal transaksi : <b>{transactionDate}</b>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className="font-semibold">Pilih Wajib Retribusi</label>
                                <SelectWajibRetribusi
                                    value={keyword}
                                    name="wajib_retribusi_id"
                                    onChange={(val: any) => { debouncedSetKeyword(val); handleSelectWajibRetribusi(val); onSelectChange?.(val); }}
                                />
                                {wajibRetribusiDetail.detail4 && (
                                    <div className="mt-4 p-4 flex flex-col gap-2 border rounded bg-white border-lime-200">
                                        <h4 className="font-semibold">Detail Wajib Retribusi</h4>
                                        <p className='text-sm'>Karcis : {wajibRetribusiDetail.detail4?.jenis_karcis.name}</p>
                                        <p className='text-sm'>Nominal : Rp. {Number(wajibRetribusiDetail.detail4?.jenis_karcis.nominal).toLocaleString()}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold">Waktu Pengambilan</label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="today"
                                        checked={dateType === 'today'}
                                        onChange={() => setDateType('today')}
                                    />
                                    Hari Ini
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="month"
                                        checked={dateType === 'month'}
                                        onChange={() => setDateType('month')}
                                    />
                                    Pilih Bulan
                                </label>
                            </div>
                            {dateType === 'month' && (
                                <SelectFieldComponent
                                    value={selectedMonth?.value || ''}
                                    options={monthOptions}
                                    placeholder="Pilih Bulan"
                                    onChange={(val) => {
                                        const selected = monthOptions.find(
                                            (opt) => opt.value === val
                                        );
                                        setSelectedMonth(selected || null);
                                        onDateChange && onDateChange(formatDateTime(selected ? new Date(new Date().getFullYear(), Number(selected.value) - 1, 1) : new Date()));
                                    }}
                                />
                            )}
                        </div>
                    }
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col gap-2">
                            <label className="font-semibold">{field.label}</label>

                            {field.type === 'select' && (
                                <SelectFieldComponent
                                    value={typeof field.value === 'string' ? field.value : null}
                                    options={Array.isArray(field.options) ? field.options : [{ label: '', value: '' }]}
                                    placeholder={`Pilih ${field.label}`}
                                    onChange={(val) => field.onChange(val ?? '')}
                                />
                            )}

                            {field.type === 'textarea' && (
                                <textarea
                                    rows={4}
                                    className="border rounded px-3 py-2 resize-none"
                                    placeholder={field.placeholder}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            )}

                            {field.type === 'file' && (
                                <input
                                    type="file"
                                    accept={field.accept}
                                    className="hover:border-[#65a30d]
                                    w-full rounded-md border border-gray-200
                                    bg-white px-4 py-2 sm:py-3
                                    text-gray-900 text-sm
                                    placeholder:text-gray-400
                                    focus:outline-none focus:ring-2 focus:ring-lime-600
                                    transition-all duration-200 cursor-pointer"
                                    onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                                />
                            )}

                            {!['select', 'textarea', 'file'].includes(field.type || '') && (
                                <Input
                                    type={field.type || 'text'}
                                    placeholder={field.placeholder ?? 'Masukkan Input'}
                                    value={typeof field.value === 'string' ? field.value : ''}
                                    onChange={(e: any) => field.onChange(e.target.value)}
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex gap-3 mt-4">
                        <Button
                            title="Batal"
                            type="button"
                            onClick={handleClose}
                            className="w-full bg-gray-800 hover:bg-gray-900"
                        />
                        <Button
                            title={submitText}
                            type="submit"
                            disabled={!isFormValid}
                            className={`
    w-full text-white transition-all duration-200
    ${isFormValid
                                    ? submitClassName || 'bg-lime-600 hover:bg-lime-700'
                                    : 'bg-gray-300 cursor-not-allowed'}
  `}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEditTambah;
