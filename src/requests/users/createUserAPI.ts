import { ICreateUserResponse, IUser } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers, ResponseStatus } from 'src/requests/constantsAPI';
import createError from 'src/requests/createError';

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
      case ResponseStatus.FAILED: {
        const res = await response.text();
        throw createError(new Error(res), `${ResponseStatus.FAILED}`);
      }
      case ResponseStatus.WRONG_ENTITY: {
        const data: ICreateUserResponse = await response.json();
        const errorsResponse = data.error;
        return errorsResponse;
      }
      case ResponseStatus.OK: {
        const data: ICreateUserResponse = await response.json();
        return data.data;
      }
      default:
        return await response.json();
    }
  } catch (err) {
    const error = err as Error;
    if (error.name === `${ResponseStatus.FAILED}`) {
      /* eslint-disable no-console */
      console.error(error);
      return {};
    }
    throw error;
  }
};

export default createUserAPI;
