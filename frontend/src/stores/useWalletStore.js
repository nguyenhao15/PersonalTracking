import React from 'react'
import { create } from 'zustand'
import api from '../lib/axios';

const useWalletStore = create((set, get) => ({
    wallets: [],
    loading: false,
    error: null,

    fetchWallets: async () => {
        const alreadyFetchingWallets = get().wallets.length > 0;
        if (alreadyFetchingWallets) return;

        set({ loading: true, error: null });

        try {
            const res = await api.get("/wallets")
            set({ wallets: res.data.data || [] })
        } catch (error) {
            console.log("Error in fetch wallets ", error);
            set({ error: "Cant fetch the wallets data" });
        } finally {
            set({ loading: false });
        }
    }
}))

export default useWalletStore