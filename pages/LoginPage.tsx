
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VALID_PASSWORD = 'aluno2026';

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, go to dashboard
    if (localStorage.getItem('auth') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === VALID_PASSWORD) {
      localStorage.setItem('auth', 'true');
      navigate('/dashboard');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Acesso Restrito</h1>
          <p className="text-gray-500 text-sm mt-1 text-center">Digite sua senha de aluno para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Digite sua senha..."
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all ${
                error ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                Senha incorreta. Tente novamente.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-brand hover:bg-brandHover text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md active:scale-[0.98]"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            &copy; 2025 Curso de Violão. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
