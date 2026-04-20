import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch } from "../store";
import { fetchTours, selectError, selectLoading, selectTours, type Tour } from "../store/tourSlice";
import { useNavigate } from "react-router-dom";

const TourList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const tours = useSelector(selectTours);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    

    const toOrderBtn = (tour : Tour) => {
        navigate('/OrderForm', {state: {tour}})
    }

    useEffect(() => { dispatch(fetchTours()); }, [dispatch]);
    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">Error: {error}</p>;

    if (!Array.isArray(tours)) {
        return <p className="text-center text-red-600">Error: Received invalid data from the
            server.</p>;
    }

    return (
        <div>
            {tours.length === 0 ? (
                <p className="text-center text-gray-500">No tours found. Add one above!</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-12 m-24">
                    {
                        tours.map(tour => (

                            <div key={tour.id} className="md:w-100 w-85">
                                <div className="md:h-70 md:w-100 rounded-3xl overflow-hidden">
                                    <a href="">
                                        <img 
                                        src={tour.image_url} 
                                        className="h-full w-full object-cover hover:scale-150 transition-all duration-500"
                                        onClick={() => toOrderBtn(tour)}/>
                                        
                                    </a>
                                </div>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold m-3">{tour.title}</h2>
                                    <h2 className="text-2xl font-bold text-green-500">{tour.price} {tour.currency}</h2>
                                </div>
                                <h3 className="text-xl">{tour.short_description}</h3>

                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}


export default TourList; 
