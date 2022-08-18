import { IUserSignIn, ISignInResponse } from 'src/requests/interfaceAPI';
import { Headers, Methods, UrlPath } from 'src/requests/constantsAPI';

const signInAPI = async (userData: IUserSignIn) => {
  try {
    const rawResponse = await fetch(`${UrlPath.BASE}/${UrlPath.SIGNIN}`, {
      method: `${Methods.POST}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
      },
      body: JSON.stringify(userData),
    });

    const content: ISignInResponse = await rawResponse.json();

    return content;
  } catch (error) {
    // errors 403 - wrong email or password
    throw new Error();
  }
};

export default signInAPI;