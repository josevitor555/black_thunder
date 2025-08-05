import React, { useState } from 'react';
import Warning from './Warning';

const WarningExample: React.FC = () => {
  const [warningState, setWarningState] = useState<{
    isOpen: boolean;
    type: 'warning' | 'error' | 'info';
    title: string;
    message: string;
    details: string[];
  }>({
    isOpen: false,
    type: 'warning',
    title: '',
    message: '',
    details: []
  });

  const showWarning = (type: 'warning' | 'error' | 'info', title: string, message: string, details: string[] = []) => {
    setWarningState({
      isOpen: true,
      type,
      title,
      message,
      details
    });
  };

  const closeWarning = () => {
    setWarningState(prev => ({ ...prev, isOpen: false }));
  };

  // Exemplos de diferentes situações de validação
  const handleMissingFields = () => {
    showWarning(
      'warning',
      'Campos obrigatórios não preenchidos',
      'Por favor, preencha todos os campos obrigatórios para continuar.',
      [
        'Nome de usuário é obrigatório',
        'Email é obrigatório',
        'Senha deve ter pelo menos 6 caracteres'
      ]
    );
  };

  const handleInvalidEmail = () => {
    showWarning(
      'error',
      'Email inválido',
      'O formato do email informado não é válido.',
      [
        'Verifique se o email contém @',
        'Verifique se o domínio está correto',
        'Exemplo de formato válido: usuario@exemplo.com'
      ]
    );
  };

  const handleWeakPassword = () => {
    showWarning(
      'warning',
      'Senha muito fraca',
      'Sua senha não atende aos requisitos mínimos de segurança.',
      [
        'Mínimo de 8 caracteres',
        'Pelo menos uma letra maiúscula',
        'Pelo menos um número',
        'Pelo menos um caractere especial'
      ]
    );
  };

  const handleLoginError = () => {
    showWarning(
      'error',
      'Falha no login',
      'Não foi possível fazer login com as credenciais fornecidas.',
      [
        'Verifique se o email está correto',
        'Verifique se a senha está correta',
        'Tente novamente ou recupere sua senha'
      ]
    );
  };

  const handleInfoMessage = () => {
    showWarning(
      'info',
      'Informação importante',
      'Sua conta foi criada com sucesso! Verifique seu email para confirmar o cadastro.',
      [
        'Email de confirmação enviado',
        'Verifique sua caixa de spam',
        'Clique no link no email para ativar sua conta'
      ]
    );
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Exemplos de Avisos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={handleMissingFields}
          className="p-4 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors"
        >
          Campos Faltantes
        </button>
        
        <button
          onClick={handleInvalidEmail}
          className="p-4 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
        >
          Email Inválido
        </button>
        
        <button
          onClick={handleWeakPassword}
          className="p-4 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors"
        >
          Senha Fraca
        </button>
        
        <button
          onClick={handleLoginError}
          className="p-4 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
        >
          Erro no Login
        </button>
        
        <button
          onClick={handleInfoMessage}
          className="p-4 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
        >
          Mensagem Informativa
        </button>
      </div>

      <Warning
        isOpen={warningState.isOpen}
        onClose={closeWarning}
        type={warningState.type}
        title={warningState.title}
        message={warningState.message}
        details={warningState.details}
      />
    </div>
  );
};

export default WarningExample; 