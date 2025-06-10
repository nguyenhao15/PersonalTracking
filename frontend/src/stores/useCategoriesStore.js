import React from 'react'
import { create } from 'zustand'
import api from '../lib/axios';

const useCategoriesStore = create((set, get) => ({
    categories: [],
    loading: false,
    error: null,

    fetchCategories: async () => {
        const alreadyFetched = get().categories.length > 0;
        if (alreadyFetched) return;

        set({ loading: true, error: null });

        try {
            const res = await api.get("/categories")
            set({ categories: res.data.data || [] })
        } catch (error) {
            console.log("Error in fetch categories", error);
            set({ error: "Cant fetch the category data" });
        } finally {
            set({ loading: false });
        }
    },

    getCategoryName: (id) => {
        const category = get().categories.find((c) => c._id === id);
        return category?.categoryName || "Missing category";
    }

}))

export default useCategoriesStore