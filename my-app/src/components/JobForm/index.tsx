import React, { useState } from 'react';


interface JobFormProps {
  onAddJob?: (job: { titulo: string; descricao: string; empresa: string; stacks: string[] }) => void;
}

const JobForm: React.FC<JobFormProps> = ({ onAddJob }) => {

  const [titulo, setTitle] = useState('');
  const [descricao, setDescription] = useState('');
  const [empresa, setCompany] = useState('');
  const [stacks, setStacks] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState('');
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
        body: JSON.stringify({ titulo, descricao, empresa, stacks })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ao criar vaga: ${res.status} - ${errorText}`);
      }

      const data = await res.json();

      // opcional: atualiza a lista de jobs no frontend
      if (onAddJob) {
        onAddJob(data); // data deve conter o objeto do job criado
      }

      // limpa o formulário
      setTitle('');
      setDescription('');
      setCompany('');
      setStacks([]);
      setStackInput('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-main-4 p-6 rounded-lg mb-6">
      <h2 className="text-main-5 text-xl font-bold mb-4">Cadastrar Nova Vaga</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <p className="text-main-5 mb-2">Enviando...</p>}


      <div className="mb-3">
        <input
          className="w-full p-2 rounded bg-main-1 text-white mb-2"
          type="text"
          placeholder="Título da vaga"
          value={titulo}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="w-full p-2 rounded bg-main-1 text-white mb-2"
          type="text"
          placeholder="Empresa"
          value={empresa}
          onChange={e => setCompany(e.target.value)}
        />
        <textarea
          className="w-full p-2 rounded bg-main-1 text-white mb-2"
          placeholder="Descrição da vaga"
          value={descricao}
          onChange={e => setDescription(e.target.value)}
        />

        {/* Campo para adicionar stacks */}
        <div className="mb-2">
          <div className="flex gap-2 mb-2">
            <input
              className="flex-1 p-2 rounded bg-main-1 text-white"
              type="text"
              placeholder="Adicionar tecnologia (ex: React, Node.js)"
              value={stackInput}
              onChange={e => setStackInput(e.target.value)}
              onKeyDown={e => {
                if ((e.key === 'Enter' || e.key === ',') && stackInput.trim()) {
                  e.preventDefault();
                  if (!stacks.includes(stackInput.trim())) {
                    setStacks([...stacks, stackInput.trim()]);
                  }
                  setStackInput('');
                }
              }}
            />
            <button
              type="button"
              className="bg-main-5 text-white px-3 py-1 rounded hover:bg-main-3"
              onClick={() => {
                if (stackInput.trim() && !stacks.includes(stackInput.trim())) {
                  setStacks([...stacks, stackInput.trim()]);
                  setStackInput('');
                }
              }}
            >
              Adicionar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {stacks.map((stack, idx) => (
              <span
                key={idx}
                className="bg-main-5 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm cursor-pointer"
                onClick={() => setStacks(stacks.filter((_, i) => i !== idx))}
                title="Remover tecnologia"
              >
                {stack} &times;
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-main-5 text-white px-4 py-2 rounded hover:bg-main-3"
        disabled={loading}
      >
        Cadastrar
      </button>
    </form>
  );
};

export default JobForm;
