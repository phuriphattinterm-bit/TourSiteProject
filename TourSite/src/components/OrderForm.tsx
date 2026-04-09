import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addOrder } from "../store/orderSlice";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../store";


const OrderForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation();
    const tour = location.state?.tour;
    const tour_name = tour?.title;
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [hotel_name, setHotel_name] = useState('');
    const [guest_number, setGuest_number] = useState(1);

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        dispatch(addOrder({
            tour_name,
            date: new Date(date).toISOString().split('T')[0],
            hotel_name,
            guest_number
        }))
    }

    return (
        <div>
            <div className=" p-16 px-32 gap-8 flex justify-center">
                {/*Left side*/}
                <div className="flex-1 h-140 rounded-3xl overflow-hidden">
                    <img src={tour?.image_url} alt="tour-image" className="w-full h-full hover:scale-120 transition-all
                    duration-500 object-cover"/>
                </div>
                {/*Right side*/}
                <div className="gap-8 flex flex-1 flex-col">
                    <h1 className="text-3xl font-bold">{tour?.title}</h1>
                    <h2>{tour?.long_description || ''}</h2>
                    <form className="flex gap-8" onSubmit={handleSubmit}>
                        <div className="gap-2 flex flex-col">
                            <label htmlFor="date">Date for the guided tour</label>
                            <input type="date" value={date} className="p-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setDate(e.target.value)} />
                            <label htmlFor="maxcap">Number of people</label>
                            <input type="number" value={guest_number} min={1} max={16} className="p-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setGuest_number(parseInt(e.target.value))} />
                            <h1 className="p-2 text-xl text-green-500">{tour?.price} JPY</h1>
                            <button type='submit' className="p-2 w-40 text-xl text-white bg-red-500 rounded-full
                            hover:bg-red-400 hover:scale-120 transition-all duration-500">
                                Add to cart
                            </button>
                        </div>
                        <div className="gap-2 flex flex-col">
                            <label htmlFor="hotel">Hotel Name</label>
                            <input type="text" value={hotel_name} className="p-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setHotel_name(e.target.value)} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OrderForm;