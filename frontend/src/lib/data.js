import { BanknoteArrowDown, BanknoteArrowUp, ChartArea, WalletCards } from "lucide-react";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: ChartArea,
        path: "/dashboard"
    },
    {
        id: "02",
        label: "Income",
        icon: BanknoteArrowUp,
        path: "/income"
    },
    {
        id: "03",
        label: "Expenses",
        icon: BanknoteArrowDown,
        path: "/expenses"
    },
    {
        id: "04",
        label: "Wallets",
        icon: WalletCards,
        path: "/wallets"
    },
];

