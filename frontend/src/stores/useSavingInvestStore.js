import React from 'react'
import { create } from 'zustand'
import api from '../lib/axios';

const useSavingInvestStore = create((set, get) => ({
    savingAndInvest: [],
    loading: false,
    error: null,

    fetchData: async () => {
        const alreadyFetchData = get().savingAndInvest.length > 0;
        if (alreadyFetchData) return;

        set({ loading: true });

        try {
            const res = await api.get("/sni")
            set({ savingAndInvest: res.data.data || [] })
            console.log("Saving data is here: ", res)
        } catch (err) {
            console.log("Error in fetching data ", err);
            set({ error: err.data.message })
        } finally {
            set({ loading: false })

        }

    },

    getName: (id) => {
        const savingAndInvest = get().savingAndInvest.find((s) => s._id === id)
        return savingAndInvest?.title || "Missing saving";
    }

}))

export default useSavingInvestStore