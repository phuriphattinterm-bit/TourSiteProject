import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu, Gamepad, Plane, } from 'lucide-react';
import Home from './Home';
import Experience from './Experience';
import Cart from './Cart';
import Login from './Login';
import SignUp from './SignUp';
import TourForm from './TourForm';
import OrderList from './OrderList';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, logout, selectAdmin } from '../store/userSlice';
import type { AppDispatch } from '../store';
import OrderForm from './OrderForm';

const RoutingApp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isAdmin = useSelector(selectAdmin);
    const isLoggedin = useSelector(selectUsers);
    const dispatch = useDispatch<AppDispatch>();
    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        dispatch(logout())
    }

    return (
        <BrowserRouter>
            <div className='sticky top-0 z-50 w-full'>
                {/*Header Zone*/}
                <header className='flex border-b w-full mx-0 p-4 justify-between items-center shadow-md bg-white/50 backdrop-blur-md'>
                    <Gamepad />
                    <nav className='hidden md:block'>

                        {isAdmin ?

                            <ul className='flex text-2xl gap-4'>
                                <li><Link to="/" className='hover:text-red-500 transition-all duration-300'>Home</Link></li>
                                <li><Link to="/Experience" className='hover:text-red-500 transition-all duration-300'>Tour List</Link></li>
                                <li><a href="/#gallery" className='hover:text-red-500 transition-all duration-300'>Gallery</a></li>
                                <li><Link to="/OrderList" className='hover:text-red-500 transition-all duration-300'>Orders</Link></li>
                                {isLoggedin ?
                                    <li><Link to="/Login" className='hover:text-red-500 transition-all duration-300' onClick={logOut}>Logout</Link></li>
                                    : <li><Link to="/Login" className='hover:text-red-500 transition-all duration-300'>Login</Link></li>
                                }
                            </ul>
                            :
                            <ul className='flex text-2xl gap-4'>
                                <li><Link to="/" className='hover:text-red-500 transition-all duration-300'>Start</Link></li>
                                <li><Link to="/Experience" className='hover:text-red-500 transition-all duration-300'>Experiences</Link></li>
                                <li><a href="/#gallery" className='hover:text-red-500 transition-all duration-300'>Gallery</a></li>
                                <li><a href="/#contract" className='hover:text-red-500 transition-all duration-300'>Contract</a></li>
                                <li><Link to="/Cart" className='hover:text-red-500 transition-all duration-300'>Cart</Link></li>
                                {isLoggedin ?
                                    <li><Link to="/Login" className='hover:text-red-500 transition-all duration-300' onClick={logOut}>Logout</Link></li>
                                    : <li><Link to="/Login" className='hover:text-red-500 transition-all duration-300'>Login</Link></li>
                                }
                            </ul>
                        }

                    </nav>

                    <Link to='/experience'>
                        <button className='hidden md:flex items-center p-4 gap-4 
                    rounded-full bg-red-500 text-white
                    hover:bg-red-400 hover:-translate-y-1 transition-all duration-500'>
                            <span>Begin your journey</span>
                            <Plane />
                        </button>

                    </Link>

                    {/*Hamburger button*/}
                    <div className='md:hidden'>
                        <button onClick={() => { setIsOpen(!isOpen) }} type='button'>
                            <Menu className='w-12 h-12 hover:text-red-500 transition-colors duration-300' />
                        </button>
                    </div>
                </header>

                {/* Mobile navigation menu*/}
                <div
                    className={`absolute top-full w-full left-0 bg-white/50 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out ${isOpen
                        ? 'max-h-96 opacity-100 border-b shadow-md'
                        : 'max-h-0 opacity-0 border-transparent shadow-none'
                        }`}
                >
                    {isAdmin ?

                        <ul className='flex text-2xl gap-4'>
                            <li><Link to="/" className='hover:text-red-500 transition-all duration-300'>Home</Link></li>
                            <li><Link to="/Experience" className='hover:text-red-500 transition-all duration-300'>Tour List</Link></li>
                            <li><a href="/#gallery" className='hover:text-red-500 transition-all duration-300'>Gallery</a></li>
                            <li><Link to="/OrderList" className='hover:text-red-500 transition-all duration-300'>Orders</Link></li>
                            {isLoggedin ?
                                <li><Link to="/Login" className='hover:text-red-500 transition-all duration-300' onClick={logOut}>Logout</Link></li>
                                : <li><Link to="/Login" className='hover:text-red-500 transition-all duration-300'>Login</Link></li>
                            }
                        </ul>
                        :
                        <ul className='flex text-2xl gap-4'>
                            <li><Link to="/" className='hover:text-red-500 transition-all duration-300'>Start</Link></li>
                            <li><Link to="/Experience" className='hover:text-red-500 transition-all duration-300'>Experiences</Link></li>
                            <li><a href="/#gallery" className='hover:text-red-500 transition-all duration-300'>Gallery</a></li>
                            <li><a href="/#contract" className='hover:text-red-500 transition-all duration-300'>Contract</a></li>
                            <li><Link to="/Cart" className='hover:text-red-500 transition-all duration-300'>Cart</Link></li>
                            {isLoggedin ?
                                <li><Link to="/Login" className='hover:text-red-500 transition-all duration-300' onClick={logOut}>Logout</Link></li>
                                : <li><Link to="/Login" className='hover:text-red-500 transition-all duration-300'>Login</Link></li>
                            }
                        </ul>
                    }
                </div>
            </div>

            <div>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/Experience' element={<Experience />} />
                    <Route path='/Cart' element={<Cart />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/SignUp' element={<SignUp />} />
                    <Route path='/TourForm' element={<TourForm />} />
                    <Route path='/OrderForm' element={<OrderForm />} />
                    <Route path='/OrderList' element={<OrderList/>}/>
                </Routes>
            </div>



            {/*Footer zone*/}
            <footer className='flex flex-col gap-8 bg-red-500 text-white md:px-30'>
                {/*Contract us*/}
                <div className='flex flex-col md:flex-row justify-between p-8 gap-10 md:gap-50' id='contract'>
                    <div className='flex flex-col gap-8'>
                        <h1 className='font-bold text-7xl'>Contract us</h1>
                        <h2>We'd love to hear from you! If you're interested in learning more about
                            our guided tours in Japan or would like to schedule an appointment,
                            please fill out the form below. We look forward to answering your
                            questions and helping you plan an unforgettable experience in this
                            beautiful country.</h2>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {/*Names*/}
                        <div className='flex gap-2'>
                            <input type="text" className="px-2 border border-white w-1/2" id='' placeholder='Name *' />
                            <input type="text" className="px-2 border border-white w-1/2" placeholder='Last Name *' />
                        </div>
                        <input type="text" className="px-2 border border-white w-full" placeholder='Email *' />
                        <input type="text" className="px-2 border border-white h-30" placeholder='Tell us...' />
                        <button className="p-2 bg-white text-red-500 rounded-lg">Send</button>
                    </div>
                </div>

                {/*Footer*/}
                <div className='gap-4 p-4 text-white font-bold flex flex-col md:flex-row items-center justify-between'>
                    <div className='gap-4 md:gap-12 flex flex-col md:flex-row items-center justify-between'>
                        <a href="">COOKIES POLICY</a>
                        <a href="">PRIVACY POLICY</a>
                        <a href="">CANCELLATION POLICY</a>
                        <a href="">SPECIFIC COMMERCIAL TRANSACTION ACT</a>
                    </div>
                    <div className='flex gap-4'>
                        <svg fill="white" height="30" width="30" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="-271 273 256 256"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M-64.5,273h-157c-27.3,0-49.5,22.2-49.5,49.5v52.3v104.8c0,27.3,22.2,49.5,49.5,49.5h157c27.3,0,49.5-22.2,49.5-49.5V374.7 v-52.3C-15.1,295.2-37.3,273-64.5,273z M-50.3,302.5h5.7v5.6v37.8l-43.3,0.1l-0.1-43.4L-50.3,302.5z M-179.6,374.7 c8.2-11.3,21.5-18.8,36.5-18.8s28.3,7.4,36.5,18.8c5.4,7.4,8.5,16.5,8.5,26.3c0,24.8-20.2,45.1-45.1,45.1s-44.9-20.3-44.9-45.1 C-188.1,391.2-184.9,382.1-179.6,374.7z M-40,479.5C-40,493-51,504-64.5,504h-157c-13.5,0-24.5-11-24.5-24.5V374.7h38.2 c-3.3,8.1-5.2,17-5.2,26.3c0,38.6,31.4,70,70,70c38.6,0,70-31.4,70-70c0-9.3-1.9-18.2-5.2-26.3H-40V479.5z"></path>
                        </g>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16">
                            <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                        </svg>
                    </div>
                </div>
            </footer>
        </BrowserRouter>
    )
}

export default RoutingApp;