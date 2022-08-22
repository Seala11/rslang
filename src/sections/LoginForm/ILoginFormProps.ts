import { IInputsValues } from 'src/sections/SignIn/ISignInProps';

export default interface ISignInFormProps extends IInputsValues {
  inputsData: TInput[];
  text: string;
}

type TInput = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  errorMessage: string;
};
