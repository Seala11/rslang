import { IUserSignIn, ISignInResponse } from 'src/requests/interfaceAPI';
import { UrlPath } from 'src/requests/constantsAPI';

const signInAPI = async (userData: IUserSignIn) => {
  try {
    const rawResponse = await fetch(`${UrlPath.base}/${UrlPath.signin}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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