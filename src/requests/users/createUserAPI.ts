/* eslint-disable no-console */
import { ICreateUserResponse, IUser } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const createUserAPI = async (userData: IUser) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}`, {
      method: `${Methods.POST}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
      },
      body: JSON.stringify(userData),
    });

    switch (response.status) {
      case 417: {
        // user already exist
        const res = await response.text();
        console.error(res);
        return {};
      }
      case 422: {
        // wrong email or password
        // message: '"email" must be a valid email'
        // message: '"password" length must be at least 8 characters long'
        const data: ICreateUserResponse = await response.json();
        const errorsResponse = data.error;
        const errors = errorsResponse?.errors;
        errors?.map((err) => console.error(err.message));
        // console.log('422', errors, errors?.errors, errors?.status);
        return errorsResponse;
      }
      case 200: {
        const data: ICreateUserResponse = await response.json();
        return data.data;
      }
      default:
        return await response.json();
    }
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export default createUserAPI;
