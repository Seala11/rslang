import { ISignInResponse } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const getUserAPI = async (id: string) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${id}/${UrlPath.TOKENS}`, {
      method: `${Methods.GET}`,
      headers: {
        Accept: `${Headers.TYPE}`,
      },
    });

    const userSignInData: ISignInResponse = await response.json();

    return userSignInData;
  } catch (error) {
    throw new Error();
  }
};

export default getUserAPI;
