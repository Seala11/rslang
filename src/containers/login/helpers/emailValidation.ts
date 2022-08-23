const validEmail = (email: string) => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]/.test(email);

export default validEmail;