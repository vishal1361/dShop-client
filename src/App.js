import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import MyCart from './components/cart/MyCart.jsx';
import Popular from './components/popular/Popular.jsx';
import MyOrders from './components/myOrders/MyOrders.jsx';
import Welcome from './components/welcome/Welcome.jsx';
import Auth from './components/Auth/Auth.js';
import Form from './components/Form/Form.js';
import Dashboard from './components/dashboard/Dashboard.jsx';
import MyProducts from './components/myProducts/MyProducts.jsx';
function App() {

  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <div>
      <BrowserRouter >
        <Navbar/>
        <Routes>
          <Route path='/' element={ <Welcome /> } />

          <Route path='/products' element={ <Popular /> } />
          <Route path='/myOrders' element={ <MyOrders buyerId="" /> } />
          <Route path='/cart' element={ <MyCart buyerId="1" /> } />
          
          <Route path='/dashboard' element={((user )? <Dashboard/> : <Auth/> ) } />
          <Route path='/sell' element={((user && user.result.userType === "SELLER" )? <Form /> : <Auth/> ) } />
          <Route path='/myProducts' element={((user && user.result.userType === "SELLER")? <MyProducts/> : <Auth/> ) } />
          
          <Route path='/auth' exact element={((user === undefined) ? <Navigate to="/"/> : <Auth/>)} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
