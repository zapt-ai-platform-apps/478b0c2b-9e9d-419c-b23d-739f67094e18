import React, { useState } from 'react';
import supabase from '../supabaseClient';

export default function ExplainAnything() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const result = await supabase.createEvent('chatgpt_request', {
        prompt: `Explain the following: ${input}`,
        response_type: 'text',
      });
      setResponse(result.data);
      console.log('ExplainAnything response:', result.data);
    } catch (error) {
      console.error('Error explaining:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-2">Explain Anything</h2>
      <textarea
        className="w-full box-border p-2 border border-gray-300 rounded"
        rows="4"
        placeholder="Enter text you want explained..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        onClick={handleExplain}
        disabled={loading}
      >
        {loading ? 'Explaining...' : 'Explain'}
      </button>
      {response && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
          <h3 className="font-semibold">Explanation:</h3>
          <p className="mt-2 text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
}