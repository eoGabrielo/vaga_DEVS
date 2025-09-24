import React from 'react';

const Home: React.FC<{ onLogin: () => void; onRegister: () => void }> = ({ onLogin, onRegister }) => {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-main-2 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-bold mb-4 text-main-5">Bem-vindo ao Vaga Devs!</h1>
      <p className="mb-4 text-lg">
        Este é um site dedicado ao cadastro e divulgação de vagas para desenvolvedores. Aqui você pode:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Cadastrar vagas para encontrar talentos na área de tecnologia</li>
        <li>Visualizar oportunidades de emprego para devs</li>
        <li>Entrar em contato direto com empresas via e-mail ou WhatsApp</li>
        <li>Registrar-se e logar para acessar funcionalidades exclusivas</li>
      </ul>
      <div className="flex gap-4 mt-6 justify-center">
        <button
          className="bg-main-5 text-white px-6 py-2 rounded font-bold hover:bg-main-3 transition"
          onClick={onLogin}
        >
          Login
        </button>
        <button
          className="bg-main-4 text-white px-6 py-2 rounded font-bold hover:bg-main-3 transition"
          onClick={onRegister}
        >
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Home;
