import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../store/userSlice";
import { type AppDispatch } from "../store";
import { CircleSlash, CircleX } from "lucide-react";

const SignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPWD, setConfirmPWD] = useState('');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (password === confirmPWD &&
            password !== '' &&
            confirmPWD !== '' &&
            username !== '' &&
            email !== '' &&
            password.length >= 10 &&
            username.length > 4
        ) {
            setIsReady(true)
        } else {
            setIsReady(false)
        }
    }, [password, confirmPWD, username, email])

    const handleSignUp = () => {

        dispatch(signUp({ username, password, email }))

    }

    return (
        <div className="h-screen flex justify-center items-center">
            {/*Container box*/}
            <div className="p-9 w-sm flex flex-col bg-gray-100 rounded-xl transition-all duration-500 shadow-md hover:shadow-xl items-center">
                <h1 className="font-bold text-lg p-3">Sign Up</h1> 

                <form className="flex flex-col gap-4 w-3/4" onSubmit={handleSignUp}>
                    <div className="flex flex-col">
                        <label htmlFor="uname">Username</label>
                        <input type="text" name="uname" value={username} onChange={(e) => setUsername(e.target.value)} className="border border-black" />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-black" />
                        <label htmlFor="pwd">Password</label>
                        <input type="password" name="pwd" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-black" />
                        <label htmlFor="pwd">Confirm Password</label>
                        <input type="password" name="pwd" value={confirmPWD} onChange={(e) => setConfirmPWD(e.target.value)} className="border border-black" />
                    </div>
                    {isReady ?
                        <div className={`p-4 my-4 flex items-center gap-4 bg-green-200 text-green-800 text-md duration-500 rounded-xl ${isReady ? 'opacity-100' : 'opacity-0-hidden'}`}>
                            <CircleSlash className="flex-shrink-0" />
                            <p>You're ready.</p>
                        </div>
                        :
                        <div className={`p-4 my-4 flex items-center gap-4 bg-red-300 text-red-800 text-md duration-500 rounded-xl ${isReady ? 'opacity-0-hidden' : 'opacity-100'}`}>
                            <CircleX className="flex-shrink-0" />
                            <p>Username, password, too short, doesn't match or something is missing.</p>
                        </div>
                    }

                    <button type="submit" className="p-2 bg-red-500 text-white rounded-xl transition-all duration-500 hover:scale-120 hover:bg-red-400">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;