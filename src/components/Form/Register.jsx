/* eslint-disable no-unused-vars */
import Lottie from 'lottie-react';
import registerData from '../../assets/register.json.json';
import { Link, useNavigate } from 'react-router'; 
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { createUser } = useContext(AuthContext);

 const handleRegister = (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const { email, password, name, photo } = Object.fromEntries(formData.entries());

  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!passwordRegExp.test(password)) {
    setErrorMessage('Password must have at least 1 uppercase, 1 lowercase letter, and be at least 6 characters long.');
    return;
  }

  createUser(email, password, name, photo)
    .then(async () => {
      const tokenRes = await fetch('https://a11-server-olive.vercel.app/jwt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await tokenRes.json();
      localStorage.setItem('token', data.token); 
      toast.success('Registration successful.');
      navigate('/login');
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage(error.message);
    });
};


  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setErrorMessage(''); 
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success('Google login successful!');
      navigate('/'); 
    } catch (googleError) {
      console.error("Google login error:", googleError);
      toast.error(`Google login failed: ${googleError.message}`);
      setErrorMessage(googleError.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: '300px' }} animationData={registerData} loop={true} />
        </div>

        <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl lg:p-8 z-10 relative">
          <h1 className='font-semibold text-center text-3xl pb-2 text-[#808000] p-8 lg:p-0'>
            Register Your Account
          </h1>
          <div className="card-body space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input type="text" name='name' className="input input-bordered w-full" required placeholder="Enter your name" />
              </div>

              <div>
                <label className="label">Email</label>
                <input type="email" name='email' className="input input-bordered w-full" required placeholder="Enter your email" />
              </div>

              <div>
                <label className="label">Photo URL</label>
                <input type="text" name='photo' className="input input-bordered w-full" required placeholder="Photo URL" />
              </div>

              <div>
                <label className="label">Password</label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    className="input bg-base-200 w-full"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className='btn btn-ghost btn-xs absolute top-2 right-6'
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {errorMessage && <p className="text-red-600">{errorMessage}</p>}

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#4F7942] to-[#808000]  transition duration-300 ease-in-out transform hover:scale-105 mt-4"
              >
                Register
              </button>

              <button type="button" className="btn btn-outline w-full rounded-lg border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300" onClick={handleGoogleLogin}>
                <FcGoogle size={24} className="mr-2" /> Login with Google
              </button>

              <p className='font-bold text-center dark:text-gray-950 pt-5'>
                Already Have An Account?{' '}
                <Link to='/login'>
                  <span className='text-[#808000] font-bold'>Login</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
