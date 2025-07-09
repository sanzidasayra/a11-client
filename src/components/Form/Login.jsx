/* eslint-disable no-unused-vars */
import Lottie from 'lottie-react';
import loginData from '../../assets/login.json.json';
import { Link, useLocation, useNavigate } from 'react-router'; 
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/Firebase'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailForReset, setEmailForReset] = useState('');
  const [isResetMode, setIsResetMode] = useState(false); 
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    setError('');

    if (!email || !password) {
      const message = 'Please enter both email and password.';
      setError(message);
      toast.error(message);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Login successful!');
        navigate(from, { replace: true });
      })
      .catch((firebaseError) => {
        console.error("Firebase login error:", firebaseError);
        const errorMessage =
          firebaseError.code === 'auth/invalid-credential' ||
          firebaseError.code === 'auth/user-not-found' ||
          firebaseError.code === 'auth/wrong-password'
            ? 'Invalid email or password.'
            : firebaseError.message || 'Login failed. Please try again.';
        toast.error(errorMessage);
        setError(errorMessage);
      });
  };

const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  setError('');
  try {
    const result = await signInWithPopup(auth, provider);
    const userEmail = result.user.email;

    const tokenRes = await fetch('http://localhost:3000/jwt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail }),
    });

    const data = await tokenRes.json();
    localStorage.setItem('token', data.token); 
    toast.success('Google login successful!');
    navigate('/'); 
  } catch (googleError) {
    console.error("Google login error:", googleError);
    toast.error(`Google login failed: ${googleError.message}`);
    setError(googleError.message);
  }
};


  const handleForgetPassword = () => {
    setIsResetMode(true);  
  };

  const handleResetPassword = () => {
    if (!emailForReset) {
      setError('Please enter a valid email to reset the password.');
      return;
    }

    sendPasswordResetEmail(auth, emailForReset)
      .then(() => {
        toast.success('Password reset email sent!');
        setIsResetMode(false); 
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        setError('Failed to send reset email. Please try again later.');
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: '300px' }} animationData={loginData} loop={true} />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className='font-semibold text-center text-3xl pb-2 text-[#808000] p-8 lg:p-0'>
            Login Your Account
          </h1>
          <div className="card-body">
            
            {!isResetMode ? (
              <form onSubmit={handleLogIn}>
                <label className="label">Email</label>
                <input type="email" name="email" className="input input-bordered w-full" placeholder="Email" />

                <div>
                  <label className="label font-semibold text-gray-700 dark:text-gray-300">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="input input-bordered w-full pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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

                <div>
                  <a onClick={handleForgetPassword} className="link link-hover">Forgot password?</a>
                </div>

                <button className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#4F7942] to-[#808000] hover:scale-105 mt-4">
                  Login
                </button>

                <button type="button" className="btn btn-outline w-full rounded-lg border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 mt-3" onClick={handleGoogleLogin}>
                  <FcGoogle size={24} className="mr-2" /> Login with Google
                </button>

                <p className="font-semibold text-gray-700 pt-5 text-center">
                  Don’t have an account?{' '}
                  <Link to="/register" className="text-[#808000] font-bold hover:underline">
                    Register
                  </Link>
                </p>

                {error && <p className="text-red-600 mt-2">{error}</p>}
              </form>
            ) : (
              
              <div className="space-y-4">
                <label className="label">Enter your email to reset the password</label>
                <input
                  type="email"
                  value={emailForReset}
                  onChange={(e) => setEmailForReset(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Email"
                />
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#4F7942] to-[#808000] hover:scale-105 mt-4"
                >
                  Reset Password
                </button>
                <p className="font-semibold text-gray-700 pt-5 text-center">
                  <span onClick={() => setIsResetMode(false)} className="text-[#808000] font-bold hover:underline cursor-pointer">
                    Back to Login
                  </span>
                </p>
                {error && <p className="text-red-600 mt-2">{error}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
