
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VALID_PASSWORD = 'aluno2026';

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('auth') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Pequeno delay para simular processamento e dar feedback visual
    setTimeout(() => {
      if (password === VALID_PASSWORD) {
        localStorage.setItem('auth', 'true');
        navigate('/dashboard');
      } else {
        setError(true);
        setPassword('');
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-white">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-brand/10 rounded-2xl flex items-center justify-center mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Portal do Aluno</h1>
          <p className="text-gray-500 text-sm mt-2 text-center">Bem-vindo de volta! Insira sua chave de acesso.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Senha de Acesso
            </label>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Ex: aluno2026"
              disabled={isSubmitting}
              className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-200 outline-none text-lg ${
                error 
                  ? 'border-red-400 bg-red-50 text-red-900 focus:ring-red-100' 
                  : 'border-gray-100 bg-gray-50 focus:border-brand focus:ring-4 focus:ring-brand/10'
              } disabled:opacity-50`}
            />
            {error && (
              <div className="flex items-center mt-3 text-red-600 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-semibold">Acesso negado. Verifique a senha.</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand hover:bg-brandHover disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-brand/20 active:scale-[0.97] flex items-center justify-center space-x-2 overflow-hidden"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <span>Acessar Conteúdo</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-gray-50 pt-8">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">
            Plataforma Segura &bull; Acesso Vitalício
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
