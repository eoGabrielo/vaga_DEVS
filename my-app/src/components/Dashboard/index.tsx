import { useState, useEffect } from "react";
import JobPost from "../JobPost"; // componente que renderiza cada post

export default function JobList() {
  const [jobs, setJobs] = useState([]);       // estado para armazenar posts
  const [loading, setLoading] = useState(true); // estado de loading
  const [error, setError] = useState(null);     // estado de erro

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token"); // pega token JWT se usar autenticação
        const res = await fetch("http://localhost:3000/post/buscar", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` // só se a rota estiver protegida
          }
        });

        if (!res.ok) {
          const errorText = await res.text(); // pega resposta do servidor
          throw new Error(`Erro ao buscar posts: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        setJobs(data.reverse());  // salva os posts no estado
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs()
  }, []);

  

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      {jobs.map((job: any) => (
        <JobPost key={job._id || job.id} job={{
          ...job,
          stacks: job.stacks || ["null"] // fallback para stacks mockadas
        }} />
      ))}
    </div>
  );
}
