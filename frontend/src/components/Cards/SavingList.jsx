import React, { useState } from 'react'
import SavingCard from './SavingCard'
import { ArrowBigLeft, PlusCircleIcon } from 'lucide-react'
import { formatThousands, getTotal } from '../../lib/util'
import CreateSaving from '../Create/CreateSaving'
import toast from 'react-hot-toast'
import api from '../../lib/axios'
import useSavingInvestStore from '../../stores/useSavingInvestStore'

const SavingList = ({ data }) => {
    const [editSaving, setEditSaving] = useState({ data: null, show: false, type: null });
    const { addSaving, updateSaving, savingAndInvest } = useSavingInvestStore();

    const handleSubmit = async (saving) => {
        const requiredFields = ["title", "type", "initial", "totalAmount", "active"]
        for (const field of requiredFields) {
            const value = saving[field]
            if (value === null ||
                value === undefined ||
                (typeof value === "string" && value.trim() === "")
            ) {
                toast.error("Vui lòng điền đầy đủ thông tin")
                return;
            }
        }
        try {
            const newSaving = {
                title: saving.title,
                type: saving.type,
                initial: parseFloat(saving.initial),
                totalAmount: parseFloat(saving.totalAmount),
                currency: saving.currency,
                active: true,
            };
            console.log("new wallet is here ", newSaving);
            const res = await (
                editSaving.type === "create" ?
                    api.post("/sni/create", newSaving) :
                    api.patch(`/sni/${editSaving.data._id}`, newSaving)
            );
            editSaving.type === "create" ? addSaving(res.data) : updateSaving(res.data.data);
            toast.success(`Wallet ${editSaving.type}ed  successfully!`)
            setEditSaving({ data: null, show: false, type: null });
        } catch (error) {
            console.log("Error creating wallet", error)
            toast.error(error.message)
        }
    }

    const handleActive = async (saving) => {
        try {
            const res = await (
                api.patch(`/sni/${saving._id}`, { active: !saving.active })
            )
            updateSaving(res.data.data);
            toast.success("Update status succssfully!")
        } catch (error) {
            console.log("Error creating wallet", error)
            toast.error(error.message)
        }
    }

    return (
        <div>
            {!editSaving.show ? <div className='mt-1 '>
                <div>
                    <div className='flex items-center justify-between'>
                        <h5 className='text-lg font-semibold text-blue-800'>Total Saving:  {formatThousands(getTotal(data, 'totalAmount'))} </h5>
                        <button
                            className='card-btn'
                            onClick={() => setEditSaving({ show: true, type: "create" })}
                        >
                            Add new <PlusCircleIcon className='text-base' />
                        </button>
                    </div>

                    {savingAndInvest?.map((saving) => (
                        <SavingCard
                            key={saving._id}
                            walletName={saving.title}
                            type={saving.type}
                            balance={saving.totalAmount}
                            isActive={saving.active}
                            editSaving={() => setEditSaving({ data: saving, show: true, type: "edit" })}
                            updateActive={() => handleActive(saving)}
                        />
                    ))}
                </div>
            </div> :
                <div className='flex flex-col gap-2'>
                    <div className='items-center'>
                        <button className='card-btn ' onClick={() => setEditSaving({ data: null, type: null, show: false })}>
                            <ArrowBigLeft className='text-base' /> Back
                        </button>
                    </div>
                    <div className='mt-5'>
                        <CreateSaving
                            onAddSaving={handleSubmit}
                            editItem={editSaving}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default SavingList