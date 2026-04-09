import React from 'react';
import { Frown } from 'lucide-react';

const Cart: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <Frown className='w-25 h-25' />
            <h2 className="text-2xl md:text-3xl">Our store is empty at the moment.</h2>
        </div>
    )
}

export default Cart;