import { ISignInResponse } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const getUserAPI = async (id: string) => {
  try {
    const rawResponse = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${id}/${UrlPath.TOKENS}`, {
      method: `${Methods.GET}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
      },
    });

    const content: ISignInResponse = await rawResponse.json();

    return content;
  } catch (error) {
    throw new Error();
  }
};

export default getUserAPI;