import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectTours, deleteTour, fetchTours, filterTours } from '../store/tourSlice';
import { type AppDispatch } from '../store';
import { selectAdmin, selectUsers } from '../store/userSlice';
import { type Tour } from '../store/tourSlice';

const Experience: React.FC = () => {
    const isLoggedIn = useSelector(selectUsers);
    const isAdmin = useSelector(selectAdmin);
    const tours = useSelector(selectTours);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [query, setQuery] = useState('');

    const handleEdit = (tour: Tour) => {
        navigate('/TourForm', { state: { tour } });
    };
    const toOrderBtn = (tour: Tour) => {
        navigate('/OrderForm', { state: { tour } });
    };
    const toFormBtn = () => {
        navigate('/TourForm');
    };

    // On mount, load all tours
    useEffect(() => {
        dispatch(fetchTours());
    }, [dispatch]);

    // Fire API filter on every keystroke
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim() === '') {
                dispatch(fetchTours());
            } else {
                dispatch(filterTours(query));
            }
        }, 300); // wait 300ms after the user stops typing

        return () => clearTimeout(timer); // cancel if query changes again before 300ms
    }, [query, dispatch]);

    return (
        <div>
            {/* Add More button */}
            <div className='flex fixed top-20 z-50 p-6 items-center'>
                {isAdmin && (
                    <button
                        className='p-2 text-red-500 border border-red-500 hover:text-white
                                   hover:bg-red-500 transition-all duration-500 rounded-lg'
                        onClick={toFormBtn}>
                        Add More
                    </button>
                )}
            </div>

            <div className='flex flex-col items-center p-12'>

                {/* Search bar — above the grid */}
                <div className='w-full max-w-md mb-8'>
                    <input
                        type='text'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Search tours...'
                        className='w-full px-4 py-2 border border-gray-300 rounded-full
                                   focus:outline-none focus:border-red-400
                                   transition-all duration-300'
                    />
                </div>

                {/* Tour grid */}
                <div className='grid md:grid-cols-2 gap-12'>
                    {tours.map(tour => (
                        <div key={tour.id} className='w-85 md:w-150 flex flex-col gap-2'>
                            <div className='md:w-150 md:h-90 rounded-3xl overflow-hidden'>
                                <img
                                    onClick={() => toOrderBtn(tour)}
                                    src={tour.image_url}
                                    alt=''
                                    className='h-full w-full object-cover hover:scale-150 transition-all duration-500'
                                />
                            </div>
                            <div className='flex justify-between'>
                                {/* Left Side */}
                                <div className='flex flex-col gap-2 justify-center'>
                                    <h1 className='text-2xl font-bold md:mt-3'>{tour.title}</h1>
                                    <h1 className='text-2xl font-bold text-green-500'>
                                        {tour.price} {tour.currency}
                                    </h1>
                                    <div className='my-2'>
                                        <a className='p-2 w-1/5 border border-red-500 text-red-500 text-center rounded-lg
                                                      hover:bg-red-500 hover:text-white transition-all duration-500'>
                                            Select Option
                                        </a>
                                    </div>
                                </div>

                                {/* Right Side — admin controls */}
                                {isLoggedIn && isAdmin && (
                                    <div className='flex flex-col gap-2 justify-center'>
                                        <button
                                            onClick={() => handleEdit(tour)}
                                            className='p-2 border border-blue-500 text-blue-500 hover:text-white
                                                       hover:bg-blue-500 transition-all duration-500 rounded-lg text-xl'>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => dispatch(deleteTour(tour.id))}
                                            className='p-2 border border-red-500 text-red-500 hover:text-white
                                                       hover:bg-red-500 transition-all duration-500 rounded-lg text-xl'>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {tours.length === 0 && (
                    <p className='text-gray-400 mt-12 text-lg'>No tours found.</p>
                )}
            </div>
        </div>
    );
};

export default Experience;