import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

const WalletGallery = () => {
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const walletRes = await axios.get("/wallets");
                setWallets(walletRes.data.data)
            } catch (error) {
                console.log("Error fetching data", error);
                toast.error(error.data.message || "Falied to load data")
            }

        };
        fetchData();
    }, [])

    return (
        <div className="carousel rounded-box gap-2">
            {wallets.map((w) => (
                <div className="card bg-base-100 w-96 shadow-xl col-span-3 carousel-item">
                    <div className="card-body">
                        <div>
                            <h2 className="card-title">{w.name}</h2>
                        </div>
                        <p>{w.balance}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WalletGallery