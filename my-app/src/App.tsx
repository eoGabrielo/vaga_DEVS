import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import JobForm from './components/JobForm';
import Login from './components/Login';
import Register from './components/Register';
import { useState, useEffect } from 'react';



function App() {
  const [auth, setAuth] = useState<{ token: string | null }>({ token: null });
  const [page, setPage] = useState<'login' | 'register' | 'dashboard'>('login');

  // Checa token salvo ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem('authToken');
    const expires = localStorage.getItem('authTokenExpires');
    if (saved && expires && Date.now() < Number(expires)) {
      setAuth({ token: saved });
      setPage('dashboard');
    }
  }, []);

  const handleLogin = (token: string) => {
    setAuth({ token });
    setPage('dashboard');
    localStorage.setItem('authToken', token);
    // Expira em 1 hora
    localStorage.setItem('authTokenExpires', String(Date.now() + 60 * 60 * 1000));
  };

  const handleRegister = () => {
    setPage('login');
  };

  const handleLogout = () => {
    setAuth({ token: null });
    setPage('login');
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpires');
  };

  return (
    <>
      <Header isLoggedIn={!!auth.token} onLogout={handleLogout} onNavigate={setPage} />
      <main className="max-w-2xl mx-auto mt-8 px-2">
        {auth.token ? (
          <>
            <JobForm onAddJob={() => { }} />
            <Dashboard />
          </>
        ) : page === 'login' ? (
          <>
            <Login onLogin={handleLogin} />
            <div className="text-center mt-4">
              <button className="text-main-5 underline" onClick={() => setPage('register')}>Não tem conta? Registre-se</button>
            </div>
          </>
        ) : (
          <>
            <Register onRegister={handleRegister} />
            <div className="text-center mt-4">
              <button className="text-main-5 underline" onClick={() => setPage('login')}>Já tem conta? Faça login</button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default App;
