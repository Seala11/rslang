import { IUser, IUserSignIn } from 'src/requests/interfaceAPI';
import { UrlPath } from 'src/requests/constantsAPI';

const updateUserAPI = async (userData: IUserSignIn, id: string) => {
  try {
    const rawResponse = await fetch(`${UrlPath.base}/${UrlPath.users}/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const content: IUser = await rawResponse.json();

    return content;
  } catch (error) {
    throw new Error();
  }
};

export default updateUserAPI;
