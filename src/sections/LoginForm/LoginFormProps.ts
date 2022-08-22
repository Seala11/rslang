export default interface ISignInFormProps {
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
