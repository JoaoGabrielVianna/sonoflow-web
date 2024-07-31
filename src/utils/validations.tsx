/**
 * Função para Validar o Email (LOGIN)
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Função para Validar a senha (LOGIN)
 */
export const isValidPassword = (password: string): boolean => {
  if (password.length < 6) {
    return false
  }
  return true
}

/**
 * Funcao para Validar o Email (REGISTRO)
 */
export const isValidEmailRegister = (email: string, confirmEmail: string): boolean => {
  // Expressão regular para validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Verifica se ambos os e-mails são válidos e iguais
  return emailRegex.test(email) && emailRegex.test(confirmEmail) && email === confirmEmail;
}

/**
 * Função para Validar a senha (REGISTRO)
 */
export const isValidPasswordRegister = (password: string, confirmPassword: string): boolean => {
  const isPasswordValid = password.length >= 6;
  const isPasswordsMatch = password === confirmPassword;

  return isPasswordValid && isPasswordsMatch;
}