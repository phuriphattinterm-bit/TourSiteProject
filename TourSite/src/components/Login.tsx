import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type AppDispatch } from "../store";
import { login } from "../store/userSlice";
import { CircleX } from "lucide-react";


const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isInvalid, setIsInvalid] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.SubmitEvent) => {
        e.preventDefault();
        dispatch(login({ username, password }))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    setIsInvalid(false)
                    navigate('/')
                }
                if (result.meta.requestStatus === 'rejected') {
                    setIsInvalid(true);
                }
            })
    }

    const handleSignUpBtn = () => {
        navigate('/SignUp')
    }

    return (
        <div className="h-screen flex justify-center items-center">
            {/*Container box*/}
            <div className="p-6 w-sm flex flex-col items-center">
                <h1 className="font-bold text-lg p-3">Login</h1>

                <form className="p-9 gap-4 w-5/4 flex flex-col bg-gray-100 rounded-xl transition-all duration-500 shadow-md hover:shadow-xl" onSubmit={handleLogin}>
                    <div className="flex flex-col">
                        <label htmlFor="uname">Username</label>
                        <input type="text" name="uname" value={username} onChange={(e) => setUsername(e.target.value)} className="border border-black" />
                        <label htmlFor="pwd">Password</label>
                        <input type="password" name="pwd" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-black" />
                    </div>

                    <button type="submit" className="p-2 bg-red-500 text-white rounded-xl transition-all duration-500 hover:scale-120 hover:bg-red-400">Login</button>
                    {isInvalid ? <div className={`p-4 my-4 flex items-center gap-4 bg-red-300 text-red-800 text-md duration-500 rounded-xl`}>
                        <CircleX className="flex-shrink-0" />
                        <p>Invalid username or password.</p>
                    </div> : null}
                    <div className="flex justify-between">
                        <button type="button" className="hover:text-red-500 hover:-translate-y-2 transition-all duration-500" onClick={handleSignUpBtn}>Sign up</button>
                        <button type="button">Forgot password?</button>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default Login;