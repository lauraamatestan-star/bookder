import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { UploadBook } from './pages/UploadBook';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import { SwapTinder } from './pages/SwapTinder';
import { RatingsDemo } from './pages/RatingsDemo';
import { ExternalBookSearch } from './pages/ExternalBookSearch';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const user = localStorage.getItem('user');
  if (!user) {
    window.location.href = '/login';
    return null;
  }
  return children;
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/catalog" element={<PrivateRoute><Catalog /></PrivateRoute>} />
          <Route path="/upload" element={<PrivateRoute><UploadBook /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/swap" element={<PrivateRoute><SwapTinder /></PrivateRoute>} />
          <Route path="/ratings-demo" element={<PrivateRoute><RatingsDemo /></PrivateRoute>} />
          <Route path="/external-search" element={<PrivateRoute><ExternalBookSearch /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </UserProvider>
  );
}

export default App;