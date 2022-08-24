import { Methods, UrlPath, Headers } from 'src/helpers/constRequestsAPI';

const getUserTokenAPI = async (id: string, token: string) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${id}/${UrlPath.TOKENS}`, {
      method: `${Methods.GET}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error();
  }
};

export default getUserTokenAPI;
