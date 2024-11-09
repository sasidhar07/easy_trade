// App.jsx
import './App.css';
import LoginPage from './components/Login';
import Home from './components/Home'; // Make sure to import Home
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header';
import ProductListingPage from './components/Products';
import CartPage from './components/cart';
import './index.css';
import FarmersHome from './FarmerComponents/FarmerHomePage';


const App = () => {
  const location = useLocation();
  

return (
  <>

    {location.pathname !== '/login' && <Header />}

    <Routes>
      <Route path='/home' element={<FarmersHome/>}/>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<Home />} />
      <Route path="/products" element={<ProductListingPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
    </Routes>
  </>
)};

export default App;
