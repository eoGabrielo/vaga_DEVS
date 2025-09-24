import React from 'react';
import { Mail, Smartphone } from "lucide-react";

interface Job {
  _id: string;
  titulo: string;
  empresa: string;
  descricao: string;
  stacks: string[];
  emailContato?: string;
  whatsappContato?: string;
  createdBy?: string | { _id: string };
}

interface JobPostProps {
  job: Job;
}

const handleDelete = async (id: string) => {
  try {
    const token = localStorage.getItem("authToken") || localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/post/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (response) {
      alert("Vaga excluída com sucesso!");
    } else {
      alert("Erro ao excluir vaga.");
    }
  } catch (error) {
    console.error("Erro ao deletar:", error);
  }
};

//COMPONENTE DA VAGA (CARD)
const JobPost: React.FC<JobPostProps> = ({ job }) => {
  // Recupera o id do usuário logado salvo no localStorage (deve ser salvo no login)
  const userId = localStorage.getItem('userId');
  console.log('userId:', userId, 'job.createdBy:', job.createdBy);
  let isOwner = false;
  if (userId && job.createdBy) {
    if (typeof job.createdBy === 'string') {
      isOwner = job.createdBy === userId;
    } else if (typeof job.createdBy === 'object' && job.createdBy._id) {
      isOwner = job.createdBy._id === userId;
    }
  }

  return (
 <div className="bg-main-3/30 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 mb-10 transition transform hover:scale-[1.01] hover:shadow-2xl">

  {/* Título e empresa */}
  <h3 className="text-2xl font-bold text-main-5 mb-1">{job.titulo}</h3>
  <p className="text-main-1 font-semibold mb-3">{job.empresa}</p>
  <p className="text-main-2/90 mb-5 leading-relaxed break-words line-clamp-6">{job.descricao}</p>

  {/* Contatos */}
  <div className="space-y-3">
    {job.emailContato && (
      <div className="flex items-center gap-3 text-sm text-white bg-green-600/20 px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition">
        <Mail className="w-5 h-5 text-white" />
        <span className="font-medium">{job.emailContato}</span>
      </div>
    )}
    {job.whatsappContato && (
      <div className="flex items-center gap-3 text-sm text-white bg-green-600/20 px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition">
        <Smartphone className="w-5 h-5 text-white" />
        <span className="font-medium">{job.whatsappContato}</span>
      </div>
    )}
  </div>

  {/* Stacks */}
  <div className="flex flex-wrap gap-2 mt-6">
    {(() => {
      if (Array.isArray(job.stacks) && job.stacks.length > 0 && job.stacks.some(s => s && s !== 'null')) {
        return job.stacks
          .filter(s => s && s !== 'null')
          .map((stack: string, idx: number) => (
            <span
              key={idx}
              className="bg-green-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md hover:bg-purple-500 transition"
              style={{ textTransform: 'uppercase' }}
            >
              {stack}
            </span>
          ));
      } else {
        return <span className="text-main-2 italic">Sem stacks</span>;
      }
    })()}
  </div>

  {/* Botão de deletar */}
  {isOwner && (
    <div className="flex justify-end">
      <button
        onClick={() => handleDelete(job._id)}
        className="mt-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition"
      >
        Deletar
      </button>
    </div>
  )}
</div>


  );

}
export default JobPost;
