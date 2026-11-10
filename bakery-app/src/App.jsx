import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Verify from './pages/Verify'
import Menu from './pages/Menu'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import OrderSummary from './pages/OrderSummary'
import OrderConfirmed from './pages/OrderConfirmed'
import Orders from './pages/Orders'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/" element={<Navigate to="/menu" replace />} />
          <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/order-summary" element={<ProtectedRoute><OrderSummary /></ProtectedRoute>} />
          <Route path="/order-confirmed/:orderId" element={<ProtectedRoute><OrderConfirmed /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/menu" replace />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}
