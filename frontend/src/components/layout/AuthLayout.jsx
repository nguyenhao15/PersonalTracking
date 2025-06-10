import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className=''>
            <div className='w-screen h-screen px-12 pt-8 pb-12 bg-gray-900'>
                <h2 className='font-bold text-gray-300  border-emerald-200'>Expenses TRACKER</h2>
                <div>
                    {children}
                </div>
            </div>
        </div >
    )
}

export default AuthLayout