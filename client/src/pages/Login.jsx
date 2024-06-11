import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { signinUser } from '../redux/authSlice';
import toast from 'react-hot-toast';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
   

    if (user) {
      navigate('/');
      // toast.success('Login Successfully')
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinUser({ email, password }));
  };

  return (
    <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <div className='flex flex-row'>
          <div className='bg-yellow-500 p-1 w-2 h-10 mr-12' > </div>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 headingfont">CRUD OPERATIONS</h2>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800  headingfont">LOGIN</h2>
        <h2 className="text-sm  mb-6 text-center text-gray-800 headingfont">Enter your credentials to access your account</h2>
        {error && <p className="text-red-500">{error.message}</p>}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
           <p className="mt-4 text-sm text-center text-gray-600">
          If you don't have an account,{' '}
          <Link to="/signup" className="text-yellow-500 hover:underline">
            Signup here
          </Link>
        </p>
      </form>
    </div>
  );
};
