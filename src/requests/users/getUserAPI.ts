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

    return response;
  } catch (error) {
    throw new Error();
  }
};

export default getUserAPI;
