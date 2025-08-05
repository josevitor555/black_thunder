# Componente Warning

Um componente de aviso modal baseado no design do OriginUI, adaptado para diferentes situações de validação em formulários de cadastro e login.

## Características

- **Modal responsivo** com backdrop blur
- **3 tipos de aviso**: warning (amarelo), error (vermelho), info (azul)
- **Ícones contextuais** para cada tipo de aviso
- **Lista de detalhes** para informações específicas
- **Hook personalizado** para facilitar o uso
- **Totalmente tipado** com TypeScript

## Uso Básico

```tsx
import Warning from './components/Warning';
import { useWarning } from './hooks/useWarning';

const MyComponent = () => {
  const { warningState, closeWarning, showWarning } = useWarning();

  const handleValidation = () => {
    showWarning(
      'error',
      'Erro de validação',
      'Alguns campos não estão corretos.',
      ['Campo 1 é obrigatório', 'Campo 2 tem formato inválido']
    );
  };

  return (
    <div>
      <button onClick={handleValidation}>Validar</button>
      
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
```

## Hook useWarning

O hook `useWarning` fornece métodos de conveniência para situações comuns:

### Métodos Disponíveis

- `showWarning(type, title, message, details?)` - Método genérico
- `showMissingFields(fields)` - Para campos obrigatórios não preenchidos
- `showInvalidEmail()` - Para email com formato inválido
- `showWeakPassword(requirements)` - Para senha que não atende requisitos
- `showLoginError()` - Para falha no login
- `showSuccessInfo(title, message, details?)` - Para mensagens informativas

### Exemplo com Métodos de Conveniência

```tsx
const { 
  warningState, 
  closeWarning, 
  showMissingFields, 
  showInvalidEmail,
  showWeakPassword 
} = useWarning();

// Validar campos obrigatórios
const missingFields = ['Nome', 'Email', 'Senha'];
showMissingFields(missingFields);

// Validar email
showInvalidEmail();

// Validar senha
const requirements = ['Mínimo 8 caracteres', 'Uma letra maiúscula'];
showWeakPassword(requirements);
```

## Props do Componente

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `isOpen` | `boolean` | Sim | Controla se o modal está visível |
| `onClose` | `() => void` | Sim | Função chamada ao fechar o modal |
| `type` | `'warning' \| 'error' \| 'info'` | Não | Tipo do aviso (padrão: 'warning') |
| `title` | `string` | Sim | Título do aviso |
| `message` | `string` | Sim | Mensagem principal do aviso |
| `details` | `string[]` | Não | Lista de detalhes específicos |

## Tipos de Aviso

### Warning (Amarelo)
- **Ícone**: TriangleAlertIcon
- **Uso**: Campos obrigatórios, senha fraca, avisos gerais
- **Cor**: Amber/Amarelo

### Error (Vermelho)
- **Ícone**: AlertCircleIcon
- **Uso**: Erros de validação, falha no login, dados inválidos
- **Cor**: Red/Vermelho

### Info (Azul)
- **Ícone**: InfoIcon
- **Uso**: Mensagens informativas, sucessos, instruções
- **Cor**: Blue/Azul

## Exemplos de Uso

### 1. Validação de Formulário

```tsx
const handleSubmit = (e) => {
  e.preventDefault();
  
  const missingFields = [];
  if (!email) missingFields.push('Email é obrigatório');
  if (!password) missingFields.push('Senha é obrigatória');
  
  if (missingFields.length > 0) {
    showMissingFields(missingFields);
    return;
  }
  
  // Continuar com o envio...
};
```

### 2. Validação de Email

```tsx
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showInvalidEmail();
    return false;
  }
  return true;
};
```

### 3. Validação de Senha

```tsx
const validatePassword = (password) => {
  const requirements = [];
  
  if (password.length < 8) {
    requirements.push('Mínimo de 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    requirements.push('Pelo menos uma letra maiúscula');
  }
  
  if (requirements.length > 0) {
    showWeakPassword(requirements);
    return false;
  }
  return true;
};
```

### 4. Mensagem de Sucesso

```tsx
const handleSuccess = () => {
  showSuccessInfo(
    'Conta criada com sucesso!',
    'Verifique seu email para confirmar o cadastro.',
    ['Email de confirmação enviado', 'Verifique sua caixa de spam']
  );
};
```

## Estilização

O componente usa Tailwind CSS e é totalmente responsivo. As cores e estilos são aplicados automaticamente baseados no tipo de aviso.

### Classes CSS Principais

- **Container**: `fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm`
- **Modal**: `relative w-full max-w-md mx-4 bg-white rounded-lg shadow-lg border`
- **Ícones**: Cores específicas para cada tipo (amber-500, red-500, blue-500)

## Integração com Formulários

Para integrar com formulários existentes, simplesmente importe o hook e use os métodos apropriados:

```tsx
// No seu componente de formulário
import { useWarning } from '../hooks/useWarning';

const LoginForm = () => {
  const { warningState, closeWarning, showMissingFields, showInvalidEmail } = useWarning();
  
  // Use os métodos de validação...
  
  return (
    <form>
      {/* Seus campos de formulário */}
      <Warning {...warningState} onClose={closeWarning} />
    </form>
  );
};
```

## Arquivos Relacionados

- `Warning.tsx` - Componente principal
- `useWarning.ts` - Hook personalizado
- `WarningExample.tsx` - Exemplos de uso
- `LoginFormExample.tsx` - Exemplo prático com formulário 