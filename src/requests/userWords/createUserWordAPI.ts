import { IUserWord } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const createUserWordAPI = async (userId: string, wordId: string, wordData: IUserWord) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.WORDS}/${wordId}`,
      {
        method: `${Methods.POST}`,
        headers: {
          Accept: `${Headers.TYPE}`,
          'Content-Type': `${Headers.TYPE}`,
        },
        body: JSON.stringify(wordData),
      }
    );

    const word: IUserWord = await response.json();

    return word;
  } catch (error) {
    throw new Error();
  }
};

export default createUserWordAPI;