import React, { useState } from 'react';
import supabase from '../supabaseClient';

export default function ImplementRequest() {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImplement = async () => {
    if (!request) return;
    setLoading(true);
    try {
      const result = await supabase.createEvent('implement_request', {
        request,
        app_id: import.meta.env.VITE_PUBLIC_APP_ID,
      });
      setResponse(result.data);
      console.log('ImplementRequest response:', result.data);
    } catch (error) {
      console.error('Error implementing request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-2">Implement Any Request</h2>
      <textarea
        className="w-full box-border p-2 border border-gray-300 rounded"
        rows="4"
        placeholder="Describe what you want to implement..."
        value={request}
        onChange={(e) => setRequest(e.target.value)}
      ></textarea>
      <button
        className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        onClick={handleImplement}
        disabled={loading}
      >
        {loading ? 'Implementing...' : 'Implement'}
      </button>
      {response && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
          <h3 className="font-semibold">Implementation:</h3>
          <p className="mt-2 text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
}