import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../store";
import { addTour, updateTour } from "../store/tourSlice";
import { useLocation, useNavigate } from "react-router-dom";



const TourForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const tour = location.state?.tour;
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState(tour?.title || '');
    const [long_description, setLongDesc] = useState(tour?.long_description || '');
    const [short_description, setShortDesc] = useState(tour?.short_description || '');
    const [image_url, setUrl] = useState(tour?.image_url || '');
    const [price, setPrice] = useState(tour?.price || 0);
    const currency = 'JPY';
    const [max_capacity, setTourCap] = useState(tour?.max_capacity || 0);


    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        if (tour) {
            dispatch(updateTour({...tour, title, short_description, long_description, image_url, price, currency, max_capacity }))
        } else {
            dispatch(addTour({ title, short_description, long_description, image_url, price, currency, max_capacity }))
        }
        navigate('/Experience')
    }

    return (
        <div className="p-18 bg-gray-100 flex flex-col rounded-xl md:m-15 md:mx-50">
            <div className="flex justify-center gap-12">
                {/*Left side - Display example*/}
                {/*
                <div className="md:w-100 w-85">
                    <div className="md:h-70 md:w-100 rounded-3xl overflow-hidden">
                        <img src={image_url} className="h-full w-full object-cover hover:scale-150 transition-all duration-500" />
                    </div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold m-3">{title}</h2>
                        <h2 className="text-2xl font-bold text-green-500">{price} {currency}</h2>
                    </div>
                    <h3 className="text-xl">{short_description}</h3>

                </div>
                */}
                <div className="flex-1 rounded-3xl overflow-hidden">
                    <img src={image_url} className="h-full w-full object-cover hover:scale-150 transition-all duration-500" alt="Example Photo" />
                </div>

                {/*Right side*/}
                <div className="flex-1">
                    <form onSubmit={handleSubmit}>
                        <div className="gap-2 flex flex-col">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="px-2 border border-black rounded-lg" />
                            <label htmlFor="shortDesc">Short Description</label>
                            <textarea name='shortDesc' rows={2} value={short_description} onChange={(e) => setShortDesc(e.target.value)} className="px-2 resize-none border border-black rounded-lg" />
                            <label htmlFor="longDesc">Long Description</label>
                            <textarea name="longDesc" rows={5} value={long_description} onChange={(e) => setLongDesc(e.target.value)} className="px-2 resize-none border border-black rounded-lg" />
                            <label htmlFor="url">Image Url</label>
                            <input type="text" name="url" value={image_url} onChange={(e) => setUrl(e.target.value)} className="px-2 border border-black rounded-lg" />
                            <label htmlFor="price">Price</label>
                            <input type="number" inputMode="numeric" name="price" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} className="px-2 border border-black rounded-lg" />
                            <label htmlFor="tourcap">Tour Capacity</label>
                            <input type="number" inputMode="numeric" name="tourcap" value={max_capacity} onChange={(e) => setTourCap(parseInt(e.target.value))} className="px-2 border border-black rounded-lg" />
                            
                                                        
                            <button type="submit" className="p-2 m-2 bg-red-500 text-white hover:bg-red-400 
                            rounded-xl hover:scale-120 
                            transition-all duration-500">{tour ? 'Edit Tour' : 'Edit Tour'}</button>


                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default TourForm;