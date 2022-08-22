import { IUser } from 'src/requests/interfaceAPI';

export interface IFormInputProps {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  errorMessage: string;
  passwordShown: boolean;
  togglePassword: () => void;
  inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showError: { name: boolean; password: boolean; email: boolean };
  values: IUser;
}
