// filepath: client/src/pages/Cart.tsx

import { Header } from '../components/Header';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { PaymentForm } from '../components/PaymentForm';
import { useState } from 'react';

export function Cart() {
  const { items, removeItem, clearCart, total } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePay = (data: any) => {
    setPaid(true);
    clearCart();
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Tu Carrito</h1>
        {paid && (
          <div className="text-center py-8 bg-green-100 rounded-lg shadow-md mb-6">
            <p className="text-green-700 text-xl font-bold">¡Pago simulado exitoso! 🎉</p>
            <p className="text-green-600">Gracias por tu compra.</p>
          </div>
        )}
        {items.length === 0 && !showPayment && !paid ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
            <p className="text-gray-400">¡Agrega algunos libros!</p>
          </div>
        ) : showPayment ? (
          <div className="flex flex-col items-center">
            <PaymentForm onPay={handlePay} />
            <button onClick={() => setShowPayment(false)} className="mt-4 text-indigo-600 hover:underline">Cancelar</button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {items.map(item => (
                <div key={item.book.id} className="flex items-center p-4 border-b border-gray-200">
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center mr-4">
                    {item.book.cover ? (
                      <img src={item.book.cover} alt={item.book.title} className="w-full h-full object-cover rounded" />
                    ) : (
                      <span className="text-2xl">📖</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{item.book.title}</h3>
                    <p className="text-gray-600 text-sm">{item.book.author}</p>
                    <p className="text-indigo-600 font-bold">${item.book.price.toFixed(2)}</p>
                  </div>
                  <div className="text-center mx-4">
                    <p className="text-gray-600">Cantidad: {item.quantity}</p>
                    <p className="font-bold">${(item.book.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <Button variant="danger" onClick={() => removeItem(item.book.id)}>
                    Eliminar
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center text-xl font-bold mb-4">
                <span>Total:</span>
                <span className="text-indigo-600">${total.toFixed(2)}</span>
              </div>
              <div className="flex gap-4">
                <Button variant="secondary" onClick={clearCart} className="flex-1">
                  Vaciar Carrito
                </Button>
                <Button className="flex-1" onClick={() => setShowPayment(true)}>
                  Proceder al Pago
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}