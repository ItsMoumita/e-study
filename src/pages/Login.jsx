import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { signIn, googleSignIn } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            Swal.fire({
                title: "Error!",
                text: "Please enter both email and password.",
                icon: "error",
               background: "white/70",
                color: "black",
                confirmButtonColor: "#002147",
            });
            return;
        }

        setLoading(true);
        try {
            await signIn(email, password);
            navigate(from, { replace: true });
            await Swal.fire({
                title: "Success!",
                text: "Login successful!",
                icon: "success",
                background: "white/70",
                color: "black",
                confirmButtonColor: "#002147",
            });

        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message || "Login failed.",
                icon: "error",
                background: "white/70",
                color: "black",
                confirmButtonColor: "#002147",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await googleSignIn();
            navigate(from, { replace: true });
            await Swal.fire({
                title: "Success!",
                text: "Logged in with Google!",
                icon: "success",
                background: "white/70",
                color: "black",
                confirmButtonColor: "#002147",
            });

        } catch (error) {
            await Swal.fire({
                title: "Error!",
                text: error.message || "Google login failed.",
                icon: "error",
                background: "white/70",
                color: "black",
                confirmButtonColor: "#002147",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[100vh]  flex flex-col gap-12 items-center justify-center bg-gradient-to-l from-[#002147]  to-gray-900/80 py-10">
            <Helmet>
                <title>Login | E-Study</title>
            </Helmet>
            <div className=" top-20 left-1/2 -translate-x-1/2">
                <Link
                    to="/"
                    className="text-[#e6ecff] text-2xl hover:text-[#fdc800] font-semibold flex items-center gap-1 transition-colors"
                >
                    <span className="text-2xl">←</span> Back to home
                </Link>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-[#002147] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold text-white text-center mb-2">Login to E-Study</h2>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-white font-medium">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="rounded px-3 py-2 bg-[#e6ecff] text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#fdc800]"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-white font-medium">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="rounded px-3 py-2 bg-[#e6ecff] text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#fdc800]"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#fdc800] text-[#002147] font-semibold py-2 rounded hover:bg-[#e0b700] transition-colors disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="flex items-center gap-2 my-2">
                    <div className="flex-1 h-px bg-[#b8cfff]" />
                    <span className="text-[#b8cfff] text-xs">or</span>
                    <div className="flex-1 h-px bg-[#b8cfff]" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn bg-white text-black border-[#e5e5e5]"
                    disabled={loading}
                >
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Login with Google
                </button>

                <div className="text-center text-[#b8cfff] mt-2">
                    Don't have an account? <a href="/register" className="underline hover:text-[#fdc800]">Register</a>
                </div>
            </form>
        </div>

    );
};

export default Login;