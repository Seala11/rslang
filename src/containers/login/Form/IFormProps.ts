import { IInputsValues } from 'src/containers/login/SignIn/ISignInProps';

export default interface ISignInFormProps extends IInputsValues {
  inputsData: TInput[];
  text: string;
  id: string;
}

type TInput = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  errorMessage: string;
};
