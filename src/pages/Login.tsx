import { Lock, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import clsx from "clsx"

import { AuthMode } from "../types/auth"
import { AuthInput } from "../components/AuthInput"
import { useAuthContext } from "../contexts/AuthContext"
import { isValidEmail, isValidEmailRegister, isValidPassword, isValidPasswordRegister } from "../utils/validations"

const Authbutton: React.FC<{ mode: AuthMode; setAuthMode: (mode: AuthMode) => void; AuthMode: string }> = ({ mode, setAuthMode, AuthMode }) => (
  <button
    onClick={() => setAuthMode(mode)}
    className={clsx(
      " py-1 rounded-full text-white  flex-1 text-center",
      { "bg-cloud-blue": mode === AuthMode }
    )}>{mode === 'LOGIN' ? 'Entrar' : 'Registrar'}</button>
)



export default function Login() {
  const [authMode, setAuthMode] = useState<AuthMode>('LOGIN')

  const [email, setEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  // const [username, setUsername] = useState<string>('')

  const { signIn, createAccount, setShowNavbar, error, setError } = useAuthContext()

  type FirebaseErrorCode =
    | 'auth/invalid-email'
    | 'auth/user-disabled'
    | 'auth/user-not-found'
    | 'auth/wrong-password'
    | 'auth/email-already-in-use'
    | 'auth/operation-not-allowed'
    | 'auth/weak-password'
    | 'auth/credential-already-in-use'
    | 'default';


  const firebaseErrors: Record<FirebaseErrorCode, string> = {
    'auth/invalid-email': 'Endereço de e-mail inválido.',
    'auth/user-disabled': 'Sua conta foi desativada. Entre em contato com o suporte.',
    'auth/user-not-found': 'Nenhum usuário encontrado com esse e-mail.',
    'auth/wrong-password': 'Senha incorreta. Verifique sua senha e tente novamente.',
    'auth/email-already-in-use': 'Este e-mail já está em uso. Tente outro e-mail.',
    'auth/operation-not-allowed': 'Operação de autenticação não permitida. Verifique as configurações.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/credential-already-in-use': 'Credenciais já em uso. Tente fazer login.',
    default: 'Ocorreu um erro desconhecido. Por favor, tente novamente.'
  };



  useEffect(() => {
    setShowNavbar(false);

    // Limpar o estado quando o componente for desmontado
    return () => setShowNavbar(true);
  }, [setShowNavbar]);


  // Metodo para logar na conta do usuário
  const handleLoginButton = async () => {
    if (isValidEmail(email) && isValidPassword(password)) {
      try {
        await signIn(email, password);
      } catch (err: any) {
        const errorCode = err.code as FirebaseErrorCode;
        const errorMessage = firebaseErrors[errorCode] || firebaseErrors.default;
        setError(errorMessage);
        console.log(err)
        // Handle errors based on Firebase auth error codes
      }
    } else {
      setError("Credenciais inválidas");
    }
  };

  // Método para criar uma conta 
  const handleRegisterButton = async () => {
    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!email || !confirmEmail || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    // Validar os e-mails
    if (!isValidEmailRegister(email, confirmEmail)) {
      if (email !== confirmEmail) {
        setError("Os e-mails fornecidos não coincidem.");
      } else {
        setError("Os e-mails fornecidos não são válidos.");
      }
      return;
    }

    // Validar a senha
    if (!isValidPasswordRegister(password, confirmPassword)) {
      if (password.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres.");
      } else if (password !== confirmPassword) {
        setError("As senhas fornecidas não coincidem.");
      }
      return;
    }

    // Limpar erro se todas as validações passaram
    setError('');

    // Aqui você pode adicionar a lógica para criar a conta
    try {
      await createAccount(email, password);
    } catch (err) {
      setError("Ocorreu um erro ao criar a conta. Tente novamente.");
    }
  }



  return (
    <div className="h-screen w-full p-4 flex flex-col items-center bg-login-background bg-cover bg-no-repeat bg-center">

      <img src='/sonoflow-logo.svg' alt="" />
      <main className='w-[21.9rem] p-8 flex flex-col items-center justify-center gap-6 bg-foggy-slate rounded-3xl'>

        <div className="w-full px-4 py-2 relative rounded-full flex items-center justify-evenly bg-custom-black-10">
          <Authbutton mode="LOGIN" setAuthMode={setAuthMode} AuthMode={authMode} />
          <Authbutton mode="REGISTER" setAuthMode={setAuthMode} AuthMode={authMode} />
        </div>


        {authMode === 'LOGIN' ?
          <>
            {/* LOGIN MODE */}
            <AuthInput value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Endereço de e-mail" icon={<Mail color="#A1A1A1" />} />
            <AuthInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" icon={<Lock color="#A1A1A1" />} />
            <h1 className="text-red-600">{error}</h1>
            <button onClick={handleLoginButton} className='w-full bg-sunshine p-3 rounded-2xl'>Entrar</button>
          </> :
          <>
            {/* REGISTER MODE */}
            <AuthInput value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Endereço de e-mail" icon={<Mail color="#A1A1A1" />} />
            <AuthInput value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} type="email" placeholder="Repitir endereço de e-mail" icon={<Mail color="#A1A1A1" />} />
            <AuthInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" icon={<Lock color="#A1A1A1" />} />
            <AuthInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Repetir senha" icon={<Lock color="#A1A1A1" />} />
            <h1 className="text-red-600">{error}</h1>
            <button onClick={handleRegisterButton} className='w-full bg-sunshine p-3 rounded-2xl'>Continuar</button>
          </>
        }
      </main>
    </div>
  )
}