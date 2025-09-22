import React, { useState } from 'react';

interface CommentSectionProps {
  jobId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ jobId }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleAddComment = () => {
    if (input.trim()) {
      setComments([...comments, input]);
      setInput('');
    }
  };

  return (
    <div className="bg-main-4 rounded p-4 mt-4">
      <h4 className="text-main-5 font-bold mb-2">Comentários</h4>
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 p-2 rounded bg-main-1 text-white border-none outline-none"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Adicione um comentário..."
        />
        <button
          className="bg-main-5 text-white px-4 py-2 rounded hover:bg-main-3"
          onClick={handleAddComment}
        >
          Comentar
        </button>
      </div>
      <ul className="space-y-1">
        {comments.map((comment, idx) => (
          <li key={idx} className="bg-main-2 p-2 rounded text-white">{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
