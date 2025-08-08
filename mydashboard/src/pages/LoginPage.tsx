import React, { useState } from 'react';
import { motion } from 'framer-motion';
import backgroundImage from "../images/thunder_logo.png";
import { Lock, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Warning from '../components/Warning';
import { useWarning } from '../hooks/useWarning';

// URL da API
const apiUrl = import.meta.env.VITE_API_URL;

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { warningState, closeWarning, showMissingFields, showInvalidEmail, showWeakPassword, showWarning } = useWarning();

    // Função para validar email
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Função para validar senha
    const validatePassword = (password: string): { isValid: boolean; requirements: string[] } => {
        const requirements: string[] = [];
        
        if (password.length < 6) {
            requirements.push('Mínimo de 6 caracteres');
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

        return {
            isValid: requirements.length === 0,
            requirements
        };
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar campos obrigatórios
        const missingFields: string[] = [];
        if (!name.trim()) missingFields.push('Nome é obrigatório');
        if (!email.trim()) missingFields.push('Email é obrigatório');

        if (missingFields.length > 0) {
            showMissingFields(missingFields);
            return;
        }

        // Validar formato do email
        if (!validateEmail(email)) {
            showInvalidEmail();
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/login`, {
                email: email,
                username: name
            });
            
            console.log("Login successful:", response.data);

            // Save token and user data to localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userInfo", JSON.stringify(response.data.user));

            // Redirect to home
            navigate("/home");

        } catch (error: unknown) {
            console.log("Error to login", error);
            
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response: { status: number; data: { message?: string } } };
                
                console.log("Error response data:", axiosError.response.data);
                console.log("Error response status:", axiosError.response.status);
                
                if (axiosError.response.status === 401) {
                    showWarning(
                        'error',
                        'Credenciais inválidas',
                        'Email ou nome de usuário incorretos. Verifique suas informações e tente novamente.',
                        [
                            'Verifique se o email está correto',
                            'Verifique se o nome de usuário está correto',
                            'Tente novamente ou recupere sua conta'
                        ]
                    );
                } else if (axiosError.response.status === 404) {
                    showWarning(
                        'error',
                        'Usuário não encontrado',
                        'Não foi possível encontrar uma conta com essas informações.',
                        [
                            'Verifique se o email está correto',
                            'Verifique se você já possui uma conta',
                            'Crie uma nova conta se necessário'
                        ]
                    );
                } else {
                    showWarning(
                        'error',
                        'Erro no servidor',
                        'Ocorreu um erro inesperado. Tente novamente mais tarde.',
                        [
                            axiosError.response.data.message || 'Erro interno do servidor',
                            'Verifique sua conexão com a internet',
                            'Tente novamente em alguns minutos'
                        ]
                    );
                }
            } else if (error && typeof error === 'object' && 'request' in error) {
                console.log("Error request:", error);
                showWarning(
                    'error',
                    'Erro de conexão',
                    'Não foi possível conectar ao servidor. Verifique sua conexão.',
                    [
                        'Verifique se o servidor está rodando',
                        'Verifique sua conexão com a internet',
                        'Tente novamente em alguns minutos'
                    ]
                );
            } else {
                console.log("Error message:", error);
                showWarning(
                    'error',
                    'Erro inesperado',
                    'Ocorreu um erro inesperado. Tente novamente.',
                    [
                        'Erro interno do sistema',
                        'Tente novamente em alguns minutos',
                        'Se o problema persistir, entre em contato com o suporte'
                    ]
                );
            }
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar campos obrigatórios
        const missingFields: string[] = [];
        if (!name.trim()) missingFields.push('Nome é obrigatório');
        if (!email.trim()) missingFields.push('Email é obrigatório');
        if (!password.trim()) missingFields.push('Senha é obrigatória');

        if (missingFields.length > 0) {
            showMissingFields(missingFields);
            return;
        }

        // Validar formato do email
        if (!validateEmail(email)) {
            showInvalidEmail();
            return;
        }

        // Validar força da senha
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            showWeakPassword(passwordValidation.requirements);
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/register`, {
                username: name,
                email: email,
                password: password
            });

            // Show success message
            showWarning(
                'info',
                'Conta criada com sucesso!',
                'Sua conta foi criada e você já pode começar a usar o TASKS.',
                [
                    'Bem-vindo ao TASKS!',
                    'Você será redirecionado para o dashboard',
                    'Comece a criar e gerenciar seus projetos'
                ]
            );

            // Save token and user data to localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userInfo", JSON.stringify(response.data.user));

            // Navigate to home after a short delay
            setTimeout(() => {
                navigate("/home");
            }, 2000);

        } catch (error: unknown) {
            console.log("Error to register user: ", error);
            
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response: { status: number; data: { message?: string } } };
                
                if (axiosError.response.status === 409) {
                    showWarning(
                        'error',
                        'Conta já existe',
                        'Já existe uma conta com esse email ou nome de usuário.',
                        [
                            'Tente usar um email diferente',
                            'Tente usar um nome de usuário diferente',
                            'Faça login se já possui uma conta'
                        ]
                    );
                } else {
                    showWarning(
                        'error',
                        'Erro no cadastro',
                        'Não foi possível criar sua conta. Tente novamente.',
                        [
                            axiosError.response.data.message || 'Erro interno do servidor',
                            'Verifique suas informações',
                            'Tente novamente em alguns minutos'
                        ]
                    );
                }
            } else {
                showWarning(
                    'error',
                    'Erro inesperado',
                    'Ocorreu um erro inesperado durante o cadastro.',
                    [
                        'Erro interno do sistema',
                        'Tente novamente em alguns minutos',
                        'Se o problema persistir, entre em contato com o suporte'
                    ]
                );
            }
        }
    }

    const handleGoogleLogin = () => {
        showWarning(
            'info',
            'Login com Google',
            'Funcionalidade em desenvolvimento. Em breve você poderá fazer login com sua conta Google.',
            [
                'Esta funcionalidade será implementada em breve',
                'Por enquanto, use o login tradicional',
                'Aguarde as próximas atualizações'
            ]
        );
    };

    const handleXLogin = () => {
        showWarning(
            'info',
            'Login com X (Twitter)',
            'Funcionalidade em desenvolvimento. Em breve você poderá fazer login com sua conta X.',
            [
                'Esta funcionalidade será implementada em breve',
                'Por enquanto, use o login tradicional',
                'Aguarde as próximas atualizações'
            ]
        );
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="h-screen w-full flex flex-col bg-[#171717] overflow-hidden">

            <div className="flex h-screen w-full">

                {/* Left Side - Login/Signup Form */}
                <div className="w-3/5 bg-[#171717] flex flex-col justify-center items-center relative overflow-y-auto">

                    <div className="text-center space-y-4 mb-4">
                        <div className="w-16 h-16 mx-auto bg-[#FFE0C2] rounded-2xl flex items-center justify-center">
                            {isLogin ? (
                                <Lock className="w-8 h-8 text-[#171717]" />
                            ) : (
                                <UserPlus className="w-8 h-8 text-[#171717]" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#FFE0C2]">
                                {isLogin ? 'Bem-vindo ao TASKS' : 'Junte-se ao TASKS'}
                            </h1>
                            <p className="text-[#FFE0C2] text-lg font-light mt-0 opacity-70">
                                {isLogin
                                    ? 'Crie e gerencie os projetos dos seus clientes como freelancer'
                                    : 'Comece a criar e gerenciar os projetos dos seus clientes'
                                }
                            </p>
                        </div>
                    </div>

                    {/* Login/Signup Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full max-w-xl px-12 mt-4 relative z-10 mb-10"
                    >
                        <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="space-y-6">

                            {/* Name Input - For both Login and Signup */}
                            <div className="space-y-2">
                                <label className="block text-[#FFE0C2] text-lg font-medium">
                                    Seu nome
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Digite seu nome aqui"
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-lg px-4 text-[#CCCCCC] text-base font-light placeholder-[#CCCCCC] backdrop-blur-xl focus:outline-none focus:border-[#FFE0C2]/30 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="block text-[#FFE0C2] text-lg font-medium">
                                    Seu email
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-[#FFE0C2]/80"
                                        >
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Digite seu email aqui"
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 text-[#CCCCCC] text-base font-light placeholder-[#CCCCCC] backdrop-blur-xl focus:outline-none focus:border-[#FFE0C2]/30 transition-all duration-300"
                                    />

                                    {/* Toggle link - para LOGIN */}
                                    {isLogin && (
                                        <div className="absolute right-0 -bottom-6">
                                            <span
                                                className="text-[#CCCCCC] text-sm font-light hover:underline cursor-pointer"
                                                onClick={toggleMode}
                                            >
                                                Não tem uma conta?
                                            </span>
                                        </div>
                                    )}
                                </div>

                            </div>

                            {/* Password Input - Only for Signup */}
                            {!isLogin && (
                                <div className="space-y-2">
                                    <label className="block text-[#FFE0C2] text-lg font-medium">
                                        Sua senha
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Digite sua senha aqui"
                                            className="w-full h-14 bg-white/5 border border-white/10 rounded-lg px-4 pr-12 text-[#CCCCCC] text-base font-light placeholder-[#CCCCCC] backdrop-blur-xl focus:outline-none focus:border-[#FFE0C2]/30 transition-all duration-300"
                                        />

                                        {/* Eye Icon */}
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#CCCCCC] hover:text-[#FFE0C2] transition-colors duration-300"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>

                                        {/* Toggle link - para SIGNUP */}
                                        <div className="absolute right-0 -bottom-6">
                                            <span
                                                className="text-[#CCCCCC] text-sm font-light hover:underline cursor-pointer"
                                                onClick={toggleMode}
                                            >
                                                Já tem uma conta?
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full h-12 bg-[#FFE0C2] text-[#171717] text-lg font-medium rounded-full hover:bg-[#FFE0C2]/90 transition-all duration-300 mt-6 cursor-pointer"
                            >
                                {isLogin ? 'ENTRAR' : 'CADASTRAR'}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center justify-center my-6">
                            <span className="text-[#CCCCCC] text-sm font-light">Ou</span>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="space-y-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleGoogleLogin}
                                className="w-full h-14 bg-[#393028] text-[#FFE0C2] text-base font-medium rounded-full hover:bg-[#393028]/80 transition-all duration-300 cursor-pointer"
                            >
                                Entrar com Google
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleXLogin}
                                className="w-full h-14 mt-2 bg-transparent border border-[#393028] text-[#FFE0C2] text-base font-medium rounded-full hover:bg-[#393028]/10 transition-all duration-300 cursor-pointer"
                            >
                                Entrar com Conta X
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* right Side - Lightning Image */}
                <div className="w-2/5 relative bg-[#171717] flex flex-col items-center justify-center overflow-hidden h-screen">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative z-10 mb-8"
                    >
                        <img
                            src={backgroundImage}
                            alt="Lightning"
                            className="max-w-full w-full h-[380px] object-contain"
                        />
                    </motion.div>

                    {/* Changelog Notification */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="w-full max-w-md mx-8"
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#FFE0C2]/20 bg-[#FFE0C2]/10">
                                    <svg
                                        className="size-5 text-[#FFE0C2]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>

                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[#FFE0C2] font-semibold text-lg">
                                            Versão 2.1 já está disponível!
                                        </h3>
                                    </div>

                                    <p className="text-[#CCCCCC] text-sm leading-relaxed">
                                        Esta atualização contém várias correções de bugs e melhorias de performance, incluindo fluxo de autenticação aprimorado e melhor responsividade da interface.
                                    </p>

                                    <div className="flex gap-3 pt-2">
                                        <button className="bg-[#FFE0C2] text-[#171717] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#FFE0C2]/90 transition-colors cursor-pointer">
                                            Ver Detalhes
                                        </button>
                                        <button className="text-[#CCCCCC] px-4 py-2 rounded-lg text-sm font-medium hover:text-[#FFE0C2] transition-colors cursor-pointer">
                                            Depois
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Warning Modal */}
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

export default LoginPage;
