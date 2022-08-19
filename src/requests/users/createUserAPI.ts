/* eslint-disable no-console */
import { ICreateUserResponse, IUser } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const errorHandler = (err: Error, errName: string) => {
  const error = err;
  error.name = errName;
  return error;
};

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
        const res = await response.text();
        throw errorHandler(new Error(res), '417');
      }
      case 422: {
        const data: ICreateUserResponse = await response.json();
        const errorsResponse = data.error;
        const errors = errorsResponse?.errors;
        errors?.map((err) => console.error('422:', err.message));
        return errorsResponse;
      }
      case 200: {
        const data: ICreateUserResponse = await response.json();
        return data.data;
      }
      default:
        return await response.json();
    }
  } catch (err) {
    const error = err as Error;
    if (error.name === '417') {
      console.error(error);
      return {};
    }
    throw error;
  }
};

export default createUserAPI;
