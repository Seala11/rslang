// import { IUser } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/helpers/constRequestsAPI';

const getUserAPI = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${userId}`, {
      method: `${Methods.GET}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        Authorization: `Bearer ${token}`,
      },
    });

    // const userData: IUser = await response.json();

    return response;
  } catch (error) {
    throw new Error();
  }
};

export default getUserAPI;
