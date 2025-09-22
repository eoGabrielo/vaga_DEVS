import React from 'react';

interface Job {
  _id: string;
  titulo: string;
  empresa: string;
  descricao: string;
  stacks: string[];
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
    <div className="bg-main-3 rounded-lg shadow-lg p-6 mb-10">
      <h3 className="text-xl font-semibold text-main-5 mb-2">{job.titulo}</h3>
      <p className="text-main-1 font-bold mb-1">{job.empresa}</p>
      <p className="mb-4">{job.descricao}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {(() => {
          if (Array.isArray(job.stacks) && job.stacks.length > 0 && job.stacks.some(s => s && s !== 'null')) {
            return job.stacks
              .filter(s => s && s !== 'null')
              .map((stack: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-main-5 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                >
                  {stack}
                </span>
              ));
          } else {
            return <span className="text-main-2 italic">Sem stacks</span>;
          }
        })()}
      </div>

      {/* Botão de deletar  IF ELSE PARA EXCLUIR SOMENTE SE O USUIARIO LOGADO FOR DO MESMO ID DO CRIADO DA VAGA */}
      
      {isOwner && (
        <div className="flex justify-end">
          <button
            onClick={() => handleDelete(job._id)}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            Deletar
          </button>
        </div>
      )}
    </div>
  );

}
export default JobPost;
