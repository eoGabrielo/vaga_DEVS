import { useState, useEffect } from "react";
import JobPost from "../JobPost"; 

export default function JobList() {
  const [jobs, setJobs] = useState([]);       
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const res = await fetch("http://localhost:3000/post/buscar", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
          }
        });

        if (!res.ok) {
          const errorText = await res.text(); 
          throw new Error(`Erro ao buscar posts: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        setJobs(data.reverse()); 
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
          stacks: job.stacks || ["null"]
        }} />
      ))}
    </div>
  );
}
