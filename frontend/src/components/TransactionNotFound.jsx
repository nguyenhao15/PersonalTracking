import { Banknote } from "lucide-react"
import { Link } from "react-router"

const TransactionNotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
            <div className='bg-primary/10 rounded-full p-8'>
                <Banknote className='size-10 text-primary' />
            </div>
            <h3 className='text-2xl font-bold'>No transactions yet</h3>
            <p className='text-base-content/70'>
                Begin manage your personal financial
            </p>
            <Link to={"/transactions/create"} className="btn btn-primary">
                Add your first transaction
            </Link>
        </div>
    );
}

export default TransactionNotFound