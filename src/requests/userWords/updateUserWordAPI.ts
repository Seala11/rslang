import { IUserWord } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const getUserWordAPI = async (userId: string, wordId: string, wordData: IUserWord) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.WORDS}/${wordId}`, {
      method: `${Methods.PUT}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
      },
      body: JSON.stringify(wordData),
    });

    const updatedWord: IUserWord = await response.json();

    return updatedWord;
  } catch (error) {
    throw new Error();
  }
};

export default getUserWordAPI;