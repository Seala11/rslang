import { IUser } from 'src/requests/interfaceAPI';
import { UrlPath } from 'src/requests/constantsAPI';

const createUserAPI = async (user: IUser) => {
  try {
    const rawResponse = await fetch(`${UrlPath.base}/${UrlPath.users}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

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
