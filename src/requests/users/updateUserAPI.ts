import { IUser, IUserSignIn } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const updateUserAPI = async (userData: IUserSignIn, id: string) => {
  try {
    const rawResponse = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${id}`, {
      method: `${Methods.PUT}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
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
