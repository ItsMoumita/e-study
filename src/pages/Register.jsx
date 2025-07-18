import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { createUser, googleSignIn, setUser, updateUser } = useContext(AuthContext);

    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";




    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value.trim();
        const photo = form.photoURL.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;

        if (name.length < 5) {
            setNameError("Name should be more than 5 characters");
            return;
        } else {
            setNameError("");
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("Password must have 6+ characters, with at least one uppercase and one lowercase letter.");
            return;
        } else {
            setPasswordError("");
        }

        try {
            const result = await createUser(email, password);
            await updateUser({ displayName: name, photoURL: photo });
            setUser({ ...result.user, displayName: name, photoURL: photo });
            Swal.fire({
                title: "Success!",
                text: "Registered successfully!",
                icon: "success",
                 background: "white/70",
                color: "black",
                confirmButtonColor: "#002147",
            });

            navigate("/");
        } catch (error) {
            navigate("/");
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                 background: "white/70",
                color: "black",
                confirmButtonColor: "#002147",
            });

        }
    };



    const handleGoogleLogin = async () => {
        setError("");
        try {
            await googleSignIn();
            // toast.success("Logged in with Google!");
            navigate("/");

            navigate(from, { replace: true });
            await Swal.fire({
                title: "Success!",
                text: "Registered with Google!",
                icon: "success",
                 background: "white/70",
                color: "black",
                confirmButtonColor: "#002147",
            });;
        } catch (erorr) {
          console.log(erorr);
        }
    };

    return (
        <div className="min-h-[100vh] flex flex-col gap-12 items-center justify-center bg-[#f0f4ff] py-10">
            <Helmet>
                <title>Register | E-Study</title>
            </Helmet>
             <div className=" top-20 left-1/2 -translate-x-1/2">
                            <Link
                                to="/"
                                className="text-[#002147] text-2xl hover:text-[#fdc800] font-semibold flex items-center gap-1 transition-colors"
                            >
                                <span className="text-2xl">←</span> Back to home
                            </Link>
                        </div>
            <form
                onSubmit={handleSubmit}
                className="bg-[#002147] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold text-white text-center mb-2">Register for PlantCare</h2>

                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-white font-medium">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="rounded px-3 py-2 bg-[#e6ecff] text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#fdc800]"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        autoComplete="name"
                    />
                </div>
                {nameError && <div className="text-red-300 text-sm">{nameError}</div>}

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
                    <label htmlFor="photoURL" className="text-white font-medium">Photo URL</label>
                    <input
                        id="photoURL"
                        type="url"
                        className="rounded px-3 py-2 bg-[#e6ecff] text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#fdc800]"
                        value={photoURL}
                        onChange={e => setPhotoURL(e.target.value)}
                        required
                        autoComplete="photo"
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
                        autoComplete="new-password"
                    />
                </div>

                {passwordError && <div className="text-red-300 text-sm">{passwordError}</div>}
                {error && <div className="text-red-300 text-sm text-center">{error}</div>}

                <button
                    type="submit"
                    className="bg-[#fdc800] text-[#002147] font-semibold py-2 rounded hover:bg-[#e0b700] transition-colors disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn bg-white text-black border-[#e5e5e5]"
                    disabled={loading}
                >
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Register with Google
                </button>

                <div className="text-center text-[#b8cfff] mt-2">
                    Already have an account? <Link to="/login" className="underline hover:text-[#fdc800]">Login</Link>
                </div>
            </form>
        </div>

    );
};

export default Register;