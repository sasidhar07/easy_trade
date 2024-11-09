import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';
import login_image from "../../assets/login.png";
import app_logo from "../../assets/Logo_app.png";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    userType: 'buyer' 

  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      const userType = Cookies.get('user_type');
      navigate(userType === 'farmer' ? '/farmer-dashboard' : '/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setError(''); 
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccessMessage('');
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    });
  };

  const validateForm = () => {
    const { username, password, confirmPassword, email } = formData;

    if (!username || !password) {
      setError('Please fill in all required fields.');
      return false;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    if (!isLogin) {
      if (!email) {
        setError('Email is required.');
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return false;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    
    try {
      const endpoint = isLogin ? 'login' : 'register';
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          userType: formData.userType,
          ...((!isLogin && { email: formData.email }))
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('jwt_token', data.token || data.jwt_token, { expires: 1 });
        Cookies.set('user_type', formData.userType, { expires: 1 });
        setSuccessMessage(isLogin ? 'Login successful!' : 'Registration successful!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError(data.message || `${isLogin ? 'Login' : 'Registration'} failed.`);
      }
    } catch (error) {
      setError(`Error during ${isLogin ? 'login' : 'registration'}. Please try again.`);
      console.error(`Error during ${isLogin ? 'login' : 'registration'}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <img src={login_image} className="loginImage" alt="Login" />
      
      <div className="login-container">
        <img src={app_logo} className="app_logo" alt="App Logo" />
        <p className="text-gray-600">Connect Farmers with Buyers</p>
        <h2 className="title">{isLogin ? 'Login' : 'Register'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <label className="block text-gray-700 mb-2">I am a:</label>
              <label className="flex items-center">
                <input
                  type="radio"
                  id="userType"
                  value="farmer"
                  checked={formData.userType === 'farmer'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Farmer
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  id="userType"
                  value="buyer"
                  checked={formData.userType === 'buyer'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Buyer
              </label>

            <label className="label" htmlFor="username">Username</label>
            <input
              className={`input ${error && !formData.username ? 'input-error' : ''}`}
              id="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="label" htmlFor="email">Email</label>
              <input
                className={`input ${error && !formData.email ? 'input-error' : ''}`}
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
          )}

          <div className="form-group">
            <label className="label" htmlFor="password">Password</label>
            <input
              className={`input ${error && !formData.password ? 'input-error' : ''}`}
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                className={`input ${error && !formData.confirmPassword ? 'input-error' : ''}`}
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
              />
            </div>
          )}

          <div className="button-container">
            <button
              className={`button-primary ${isLoading ? 'button-loading' : ''}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                isLogin ? 'Login' : 'Register'
              )}
            </button>
            <button
              className="button-secondary"
              type="button"
              onClick={handleToggle}
              disabled={isLoading}
            >
              {isLogin ? 'Create Account' : 'Back to Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;