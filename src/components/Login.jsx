import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
    const [showPassword, setShowPassword] = useState(true)
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const { signInUser, googleSignIn } = useContext(AuthContext)

    const handleLogin = e => {
        e.preventDefault()
        const form = new FormData(e.target)
        const email = form.get('email')
        const password = form.get('password')
        // console.log(email, password)

        setErrorMsg('')

        if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters long.')
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setErrorMsg('Password must contain at least one uppercase letter.')
            return;
        }

        if (!/[a-z]/.test(password)) {
            setErrorMsg('Password must contain at least one lowercase letter.')
            return;
        }

        signInUser(email, password)
            .then(result => {
                // console.log(result.user)
                navigate('/')
            })
            .catch(error => {
                // console.log(error)
                setErrorMsg(error.message)
            })
    }
    const handleGoogle = () => {

        googleSignIn()
            .then(result => {
                // console.log(result.user)
                navigate('/')
            })
            .catch(error => {
                // console.log(error)
                setErrorMsg(error.message)
            })
    }
    return (
        <div className="hero-content flex-col w-11/12 mx-auto">
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">Login now!</h1>
            </div>
            <div className="card w-full max-w-md shrink-0 border-2">
                <form className="card-body" onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type='password' name="password" placeholder="Password" className="input input-bordered" required />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute top-14 right-3">{showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</button>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#F2B33D] text-white font-bold">Login</button>
                    </div>
                    <p>Don't have an account? <Link to='/register' className="text-[#F2B33D] border-b border-orange-300">Register</Link></p>
                    {
                        errorMsg && <p>{errorMsg}</p>
                    }
                </form>
            </div>
            <div>
                <div className="flex items-center justify-center space-x-2">
                    <hr className="border-t-2 border-gray-400 flex-grow" />
                    <span className="text-black font-medium">Or</span>
                    <hr className="border-t-2 border-gray-400 flex-grow" />
                </div>
                <button onClick={handleGoogle} className="btn border-2 border-gray-400 rounded-full px-10"><FaGoogle></FaGoogle>Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;