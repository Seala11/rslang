import { IUser } from 'src/requests/interfaceAPI';
import { UrlPath } from 'src/requests/constantsAPI';

const getUserAPI = async (id: string) => {
  try {
    const rawResponse = await fetch(`${UrlPath.base}/${UrlPath.users}/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const content: IUser = await rawResponse.json();

    return content;
  } catch (error) {
    throw new Error();
  }
};

export default getUserAPI;