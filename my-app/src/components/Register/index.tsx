import React, { useState } from 'react';

interface RegisterProps {
  onRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch("http://localhost:3000/user/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        onRegister();
      } else {
        setError(data.message || 'Erro ao registrar');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-main-4 p-6 rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-main-5 text-xl font-bold mb-4">Registrar</h2>
      <input
        className="w-full p-2 rounded bg-main-1 text-white mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full p-2 rounded bg-main-1 text-white mb-2"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <button
        type="submit"
        className="bg-main-5 text-white px-4 py-2 rounded hover:bg-main-3 w-full"
        disabled={loading}
      >
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  );
};

export default Register;
