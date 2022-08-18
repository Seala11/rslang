import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const deleteUserWordAPI = async (userId: string, wordId: string) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.WORDS}/${wordId}`,
      {
        method: `${Methods.DELETE}`,
        headers: {
          Accept: `${Headers.TYPE}`,
          'Content-Type': `${Headers.TYPE}`,
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
