import React from 'react';
import japanViewImg from '../images/japan-views.webp';
import { MapPin, Calendar } from 'lucide-react';
import TourList from './TourList';
import { useSelector } from 'react-redux';
import { selectTours } from '../store/tourSlice';

const Home: React.FC = () => {
    // Fetch tours data from Redux store
    const Tours = useSelector(selectTours)

    return (
        <div className='flex flex-col'>
            
            {/* Hero Section */}
            <div className='flex flex-col md:flex-row py-2 md:px-4 md:py-5 md:px-25 md:py-12 justify-between gap-10'>
                {/* Hero Text and Booking Call-to-Action */}
                <div className='flex-1 flex flex-col justify-center'>
                    <div className='px-5 md:px-10 flex-col'>
                        <h3 className='text-red-500 font-bold font-extrabold'>DISCOVER JAPAN IN A UNIQUE WAY</h3>
                        <h1 className='text-6xl md:text-8xl font-bold mb-7'>Discover the harmony in every <span className='text-red-500'>detail</span>.</h1>
                        <h3 className='text-md md:text-lg'>Live an unforgettable experience with us.</h3>
                        
                        {/* Booking Input Box */}
                        <div className='p-5 md:p-6 my-12 gap-4 bg-gray-100 shadow-md hover:shadow-lg flex flex-col md:flex-row justify-between rounded-4xl md:rounded-full'>
                            <div className='flex gap-4'>
                                <div className='bg-red-100 p-4 md:p-4 rounded-full'><MapPin className='text-red-500 w-9 h-9 md:w-full md:h-full' /></div>
                                <div className='md:text-lg'>Select a date:</div>
                            </div>
                            <button className='bg-red-500 text-xl flex justify-center gap-2 items-center text-white py-4 px-8 rounded-full'><span>Book now!</span><Calendar /></button>
                        </div>
                    </div>
                </div>
                
                {/* Hero Image */}
                <div className='flex-1'>
                    <img src={japanViewImg} alt="" />
                </div>
            </div>

            {/* Tour Display Section */}
            <div className='flex flex-col items-center'>
                {/* Section Header with SVG Decoration */}
                <div className='text-5xl font-bold text-center flex'>Explore all our experience <svg width="47" height="58" viewBox="0 0 47 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.56582 20.7488L24.412 9.78087M12.9947 31.1917L45.391 18.5065M16.0574 41.617L36.5969 40.8098M14.5907 53.7689L28.1242 55.0991M1.84714 10.3911L10.4904 2.30814" stroke="#EA3546" stroke-width="4">
                    </path>
                </svg>
                </div>
                
                {/* List of Tour Packages */}
                <TourList />
            </div>

            {/* Gallery Section */}
            <div id='gallery' className='flex flex-col items-center gap-8 p-10'>
                <h1 className='text-5xl font-bold'>
                    Explore Japan Through each photograph.
                </h1>
                
                {/* Horizontal Scrolling Image Container */}
                <div className='flex overflow-x-scroll w-full gap-10'>
                    {/* Map through tours to display gallery images */}
                    {Tours.map(Tour => (
                        <div key={Tour.id} id={`${Tour.id}`} className='h-130 w-50 flex-shrink-0'>
                            <img src={Tour.image_url} alt="" className='w-full h-full rounded-xl object-cover' />
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default Home;