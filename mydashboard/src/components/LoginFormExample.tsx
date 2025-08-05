import React, { useState } from 'react';
import Warning from './Warning';
import { useWarning } from '../hooks/useWarning';

const LoginFormExample: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { warningState, closeWarning, showMissingFields, showInvalidEmail, showWeakPassword, showLoginError } = useWarning();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): { isValid: boolean; requirements: string[] } => {
    const requirements: string[] = [];
    
    if (password.length < 8) {
      requirements.push('Mínimo de 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      requirements.push('Pelo menos uma letra maiúscula');
    }
    if (!/[a-z]/.test(password)) {
      requirements.push('Pelo menos uma letra minúscula');
    }
    if (!/\d/.test(password)) {
      requirements.push('Pelo menos um número');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      requirements.push('Pelo menos um caractere especial');
    }

    return {
      isValid: requirements.length === 0,
      requirements
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obrigatórios
    const missingFields: string[] = [];
    if (!formData.email.trim()) missingFields.push('Email é obrigatório');
    if (!formData.password.trim()) missingFields.push('Senha é obrigatória');

    if (missingFields.length > 0) {
      showMissingFields(missingFields);
      return;
    }

    // Validar formato do email
    if (!validateEmail(formData.email)) {
      showInvalidEmail();
      return;
    }

    // Validar força da senha
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      showWeakPassword(passwordValidation.requirements);
      return;
    }

    // Simular tentativa de login
    console.log('Tentando fazer login com:', formData);
    
    // Simular erro de login (para demonstração)
    setTimeout(() => {
      showLoginError();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça login na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Exemplo de validação com avisos
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>

          {/* <div className="text-xs text-gray-500 text-center">
            <p>Para testar os avisos:</p>
            <p>• Deixe campos vazios para ver aviso de campos obrigatórios</p>
            <p>• Use email inválido para ver aviso de formato</p>
            <p>• Use senha fraca para ver aviso de segurança</p>
          </div> */}
        </form>

        <Warning
          isOpen={warningState.isOpen}
          onClose={closeWarning}
          type={warningState.type}
          title={warningState.title}
          message={warningState.message}
          details={warningState.details}
        />
      </div>
    </div>
  );
};

export default LoginFormExample; 