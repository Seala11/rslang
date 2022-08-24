import { IUserSignIn } from 'src/requests/interfaceAPI';
import { Headers, Methods, UrlPath } from 'src/helpers/constRequestsAPI';

const signInAPI = async (userData: IUserSignIn) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.SIGNIN}`, {
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

export default signInAPI;
