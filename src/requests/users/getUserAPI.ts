import { IUser } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/helpers/constRequestsAPI';

const getUserAPI = async (userId: string) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${userId}`, {
      method: `${Methods.GET}`,
      headers: {
        Accept: `${Headers.TYPE}`,
      },
    });

    const userData: IUser = await response.json();

    return userData;
  } catch (error) {
    throw new Error();
  }
};

export default getUserAPI;
