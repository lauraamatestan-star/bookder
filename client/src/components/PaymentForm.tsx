
import { useState } from 'react';


export function PaymentForm({ onPay }: { onPay: (data: any) => void }) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onPay({ number, name, expiry, cvc });
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="mt-6 w-80 bg-white p-6 rounded shadow-md">
        <input
          type="tel"
          name="number"
          placeholder="Número de tarjeta"
          value={number}
          onChange={e => setNumber(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Nombre en la tarjeta"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          required
        />
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            name="expiry"
            placeholder="MM/AA"
            value={expiry}
            onChange={e => setExpiry(e.target.value)}
            className="w-1/2 px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={cvc}
            onChange={e => setCvc(e.target.value)}
            className="w-1/2 px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Pagar</button>
        {success && <div className="text-green-600 text-center mt-2">¡Pago simulado exitoso!</div>}
      </form>
    </div>
  );
}
