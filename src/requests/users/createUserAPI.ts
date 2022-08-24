import { IUser } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/helpers/constRequestsAPI';

const createUserAPI = async (userData: IUser) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}`, {
      method: `${Methods.POST}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
      },
      body: JSON.stringify(userData),
    });

    return response;
  } catch (err) {
    throw new Error();
  }
};

export default createUserAPI;
