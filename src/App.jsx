import React, { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from './supabaseClient';
import ExplainAnything from './components/ExplainAnything';
import ExplainPDF from './components/ExplainPDF';
import DrawAIPictures from './components/DrawAIPictures';
import ImplementRequest from './components/ImplementRequest';
import MadeOnZAPT from './components/MadeOnZAPT';

export default function App() {
  const [session, setSession] = useState(null);

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return (
    <div className="min-h-screen h-full bg-gray-100 flex flex-col items-center justify-center p-4">
      {!session ? (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Sign in with ZAPT</h2>
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mb-4 block"
          >
            Visit ZAPT
          </a>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'facebook', 'apple']}
          />
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <ExplainAnything />
          <ExplainPDF />
          <DrawAIPictures />
          <ImplementRequest />
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
          <MadeOnZAPT />
        </div>
      )}
    </div>
  );
}