import React, { useEffect, useState } from 'react'
import useWalletStore from '../../stores/useWalletStore'

const Wallet = () => {

    const { wallets, fetchWallets } = useWalletStore();

    useEffect(() => {
        fetchWallets();
    }, [fetchWallets]);

    return (
        <div>Wallet</div>
    )
}

export default Wallet