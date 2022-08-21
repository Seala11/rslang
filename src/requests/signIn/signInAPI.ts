import { IUserSignIn, ISignInResponse } from 'src/requests/interfaceAPI';
import { Headers, Methods, UrlPath, ResponseStatus, ErrorMessage } from 'src/requests/constantsAPI';
import createError from 'src/requests/createError';

const signInAPI = async (userData: IUserSignIn) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.SIGNIN}`, {
      method: `${Methods.POST}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
      },
      body: JSON.stringify(userData),
    });

    switch (response.status) {
      case ResponseStatus.FORBIDDEN: {
        throw createError(new Error(ErrorMessage.LOGIN_FAILED), `${ResponseStatus.FORBIDDEN}`);
      }
      case ResponseStatus.OK: {
        const userSignInData: ISignInResponse = await response.json();
        return userSignInData;
      }
      default:
        return await response.json();
    }
  } catch (err) {
    const error = err as Error;
    if (error.name === `${ResponseStatus.FORBIDDEN}`) {
      /* eslint-disable no-console */
      console.error(error);
      return undefined;
    }
    throw error;
  }
};

export default signInAPI;
