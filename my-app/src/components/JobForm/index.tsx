import React, { useState } from 'react';


interface JobFormProps {
  onAddJob?: (job: { titulo: string; descricao: string; empresa: string; stacks: string[]; emailContato?: string; whatsappContato?: string }) => void;
}

const JobForm: React.FC<JobFormProps> = ({ onAddJob }) => {


  const [titulo, setTitle] = useState('');
  const [descricao, setDescription] = useState('');
  const [empresa, setCompany] = useState('');
  const [stacks, setStacks] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState('');
  const [emailContato, setEmailContato] = useState('');
  const [whatsappContato, setWhatsappContato] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !descricao || !empresa) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado. Faça login primeiro.');

      const res = await fetch('http://localhost:3000/post/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, descricao, empresa, stacks, emailContato, whatsappContato })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ao criar vaga: ${res.status} - ${errorText}`);
      }

      const data = await res.json();


      if (onAddJob) {
        onAddJob(data);
      }

      setTitle('');
      setDescription('');
      setCompany('');
      setStacks([]);
      setStackInput('');
      setEmailContato('');
      setWhatsappContato('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-main-4/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 mb-10 transition transform hover:scale-[1.01] hover:shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Cadastrar Nova Vaga</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {loading && <p className="text-white mb-3">Enviando...</p>}

      {/* Campos de entrada */}
      <div className="space-y-4">
        <input
          className="w-full p-3 rounded-xl bg-[#012E40] text-white placeholder:text-main-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
          type="email"
          placeholder="Email para contato"
          value={emailContato}
          onChange={e => setEmailContato(e.target.value)}
        />
        <input
          className="w-full p-3 rounded-xl bg-[#012E40] text-white placeholder:text-main-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          placeholder="WhatsApp para contato"
          value={whatsappContato}
          onChange={e => setWhatsappContato(e.target.value)}
        />
        <input
          className="w-full p-3 rounded-xl bg-[#012E40] text-white placeholder:text-main-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          placeholder="Título da vaga"
          value={titulo}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="w-full p-3 rounded-xl bg-[#012E40] text-white placeholder:text-main-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          placeholder="Empresa"
          value={empresa}
          onChange={e => setCompany(e.target.value)}
        />
        <textarea
          className="w-full p-3 rounded-xl bg-[#012E40] text-white placeholder:text-main-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Descrição da vaga"
          value={descricao}
          onChange={e => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      {/* Adicionar stacks */}
      <div className="mt-4 mb-4">
        <div className="flex gap-2 mb-3">
          <input
            className="flex-1 p-3 rounded-xl bg-[#012E40] text-white placeholder:text-main-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Adicionar tecnologia (ex: React, Node.js)"
            value={stackInput}
            onChange={e => setStackInput(e.target.value)}
            onKeyDown={e => {
              if ((e.key === "Enter" || e.key === ",") && stackInput.trim()) {
                e.preventDefault();
                if (!stacks.includes(stackInput.trim())) {
                  setStacks([...stacks, stackInput.trim()]);
                }
                setStackInput("");
              }
            }}
          />
          <button
            type="button"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition font-semibold"
            onClick={() => {
              if (stackInput.trim() && !stacks.includes(stackInput.trim())) {
                setStacks([...stacks, stackInput.trim()]);
                setStackInput("");
              }
            }}
          >
            Adicionar
          </button>
        </div>

        {/* Stacks adicionadas */}
        <div className="flex flex-wrap gap-2">
          {stacks.map((stack, idx) => (
            <span
              key={idx}
              className="bg-green-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md hover:bg-green-500 cursor-pointer transition"
              onClick={() => setStacks(stacks.filter((_, i) => i !== idx))}
              title="Remover tecnologia"
            >
              {stack} &times;
            </span>
          ))}
        </div>
      </div>

      {/* Botão de submit */}
      <button
        type="submit"
        className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition font-semibold"
        disabled={loading}
      >
        Cadastrar
      </button>
    </form>


  );
};

export default JobForm;
