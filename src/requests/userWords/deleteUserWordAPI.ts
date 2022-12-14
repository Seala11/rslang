import { Methods, UrlPath, Headers } from 'src/helpers/constRequestsAPI';

const deleteUserWordAPI = async (userId: string, wordId: string, token: string) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.WORDS}/${wordId}`,
      {
        method: `${Methods.DELETE}`,
        headers: {
          Accept: `${Headers.TYPE}`,
          'Content-Type': `${Headers.TYPE}`,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.text();

    return data;
  } catch (error) {
    throw new Error();
  }
};

export default deleteUserWordAPI;
