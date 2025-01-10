import React, { useState } from 'react';
import supabase from '../supabaseClient';

export default function ExplainPDF() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExplainPDF = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(`uploads/${file.name}`, file);

      if (uploadError) throw uploadError;

      const pdfUrl = supabase.storage.from('pdfs').getPublicUrl(uploadData.path).publicURL;

      const result = await supabase.createEvent('explain_pdf', {
        pdfUrl,
        app_id: import.meta.env.VITE_PUBLIC_APP_ID,
      });

      setResponse(result.data);
      console.log('ExplainPDF response:', result.data);
    } catch (error) {
      console.error('Error explaining PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-2">Explain PDF File</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="block mb-2"
      />
      <button
        className={`px-4 py-2 bg-blue-500 text-white rounded cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        onClick={handleExplainPDF}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Explain PDF'}
      </button>
      {response && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
          <h3 className="font-semibold">PDF Explanation:</h3>
          <p className="mt-2 text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
}