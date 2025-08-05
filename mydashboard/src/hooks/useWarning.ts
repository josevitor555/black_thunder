import { useState, useCallback } from 'react';

export type WarningType = 'warning' | 'error' | 'info';

export interface WarningState {
  isOpen: boolean;
  type: WarningType;
  title: string;
  message: string;
  details: string[];
}

export const useWarning = () => {
  const [warningState, setWarningState] = useState<WarningState>({
    isOpen: false,
    type: 'warning',
    title: '',
    message: '',
    details: []
  });

  const showWarning = useCallback((
    type: WarningType,
    title: string,
    message: string,
    details: string[] = []
  ) => {
    setWarningState({
      isOpen: true,
      type,
      title,
      message,
      details
    });
  }, []);

  const closeWarning = useCallback(() => {
    setWarningState(prev => ({ ...prev, isOpen: false }));
  }, []);

  // Métodos de conveniência para situações comuns
  const showMissingFields = useCallback((fields: string[]) => {
    showWarning(
      'warning',
      'Campos obrigatórios não preenchidos',
      'Por favor, preencha todos os campos obrigatórios para continuar.',
      fields
    );
  }, [showWarning]);

  const showInvalidEmail = useCallback(() => {
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
  }, [showWarning]);

  const showWeakPassword = useCallback((requirements: string[]) => {
    showWarning(
      'warning',
      'Senha muito fraca',
      'Sua senha não atende aos requisitos mínimos de segurança.',
      requirements
    );
  }, [showWarning]);

  const showLoginError = useCallback(() => {
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
  }, [showWarning]);

  const showSuccessInfo = useCallback((title: string, message: string, details: string[] = []) => {
    showWarning('info', title, message, details);
  }, [showWarning]);

  return {
    warningState,
    showWarning,
    closeWarning,
    showMissingFields,
    showInvalidEmail,
    showWeakPassword,
    showLoginError,
    showSuccessInfo
  };
}; 