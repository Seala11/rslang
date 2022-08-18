import { IUserWord } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const getUserWordAPI = async (userId: string, wordId: string) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.WORDS}/${wordId}`,
      {
        method: `${Methods.GET}`,
        headers: {
          Accept: `${Headers.TYPE}`,
          'Content-Type': `${Headers.TYPE}`,
        },
      }
    );

    const userWord: IUserWord = await response.json();

    return userWord;
  } catch (error) {
    throw new Error();
  }
};

export default getUserWordAPI;
