import { IUser } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const createUserAPI = async (userData: IUser) => {
  try {
    const rawResponse = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}`, {
      method: `${Methods.POST}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
      },
      body: JSON.stringify(userData),
    });
    // if (rawResponse.status === 422) return something 

    const content: IUser = await rawResponse.json();

    return content;
  } catch (error) {
    // errors 422 - wrong email or password
    // message: '"email" must be a valid email'
    // message: '"password" length must be at least 8 characters long'
    // errors 417 - user already exist
    throw new Error();
  }
};

export default createUserAPI;
