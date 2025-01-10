import React, { useState } from 'react';
import supabase from '../supabaseClient';

export default function DrawAIPictures() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDraw = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const result = await supabase.createEvent('generate_image', {
        prompt,
        app_id: import.meta.env.VITE_PUBLIC_APP_ID,
      });
      setImageUrl(result.data);
      console.log('DrawAIPictures response:', result.data);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-2">Draw AI Pictures</h2>
      <input
        type="text"
        className="w-full box-border p-2 border border-gray-300 rounded"
        placeholder="Enter description for the image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        onClick={handleDraw}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Draw'}
      </button>
      {imageUrl && (
        <div className="mt-4">
          <h3 className="font-semibold">Generated Image:</h3>
          <img src={imageUrl} alt="Generated AI" className="mt-2 max-w-full h-auto rounded" />
        </div>
      )}
    </div>
  );
}