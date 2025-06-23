import React, { useState } from 'react'
import { formatThousands } from '../../lib/util';

const CreateSaving = ({
    editItem,
    onAddSaving
}) => {
    const numericFields = ["initial", "balance"];
    const editData = editItem?.data;

    const [saving, setSaving] = useState({
        title: editData?.title,
        type: editData?.type,
        initial: editData?.initial || 0,
        totalAmount: editData?.totalAmount || 0,
        active: editData?.active || true,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (numericFields.includes(name)) {
            const raw = value.replace(/\./g, "");
            if (!/^\d*$/.test(raw)) return;
            processedValue = raw === "" ? "" : Number(raw);
        }
        setSaving((prev) => ({ ...prev, [name]: processedValue }));
    }


    return (
        <div className='flex flex-col'>
            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Saving Title</span>
                </label>
                <input
                    type="text"
                    name='title'
                    placeholder='Saving title'
                    className='input input-bordered'
                    value={saving.title}
                    onChange={handleChange}
                />
            </div>
            <div className='mb-4 form-control'>
                <label className="label">
                    <span className='label-text'>Type</span>
                </label>
                <div className="flex gap-4">
                    {[
                        { label: "Tiết kiệm", value: "saving", style: "radio-success" },
                        { label: "Đầu tư", value: "invest", style: "radio-secondary" },
                    ].map((item) => (
                        <label key={item.value} className="label cursor-pointer">
                            <input
                                type="radio"
                                name="type"
                                value={item.value}
                                checked={saving.type === item.value}
                                onChange={(e) =>
                                    setSaving((prev) => ({ ...prev, type: e.target.value }))
                                }
                                className={`radio ${item.style}`}
                            />
                            <span className="label-text ml-2">{item.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Initial</span>
                </label>
                <input
                    type="text"
                    name='initial'
                    placeholder='Initial'
                    className='input input-bordered'
                    value={formatThousands(saving.initial)}
                    onChange={handleChange}
                />
            </div>
            <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Total Amount</span>
                </label>
                <input
                    type="text"
                    name='totalAmount'
                    placeholder='Balance'
                    className='input input-bordered'
                    value={formatThousands(saving.totalAmount)}
                    onChange={handleChange}
                />
            </div>
            <div className='card-actions justify-end'>
                <button
                    type='button'
                    className='add-btn add-btn-fill uppercase'
                    onClick={() => onAddSaving(saving)}
                >
                    {editItem.type}
                </button>
            </div>
        </div>
    )
}

export default CreateSaving