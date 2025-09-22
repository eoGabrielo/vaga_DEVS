import React, { useState } from 'react';

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        onLogin(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("authToken", data.token);
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
        }
      } else {
        setError(data.message || 'Erro ao logar');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-main-4 p-6 rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-main-5 text-xl font-bold mb-4">Login</h2>
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
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};

export default Login;
