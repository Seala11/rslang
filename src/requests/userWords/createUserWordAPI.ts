import { IUserWord } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/helpers/constRequestsAPI';

const createUserWordAPI = async (
  userId: string,
  wordId: string,
  wordData: IUserWord,
  token: string
) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.WORDS}/${wordId}`,
      {
        method: `${Methods.POST}`,
        headers: {
          Accept: `${Headers.TYPE}`,
          'Content-Type': `${Headers.TYPE}`,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(wordData),
      }
    );

    return response;

    // const word: IUserWord = await response.json();

    // return word;
  } catch (error) {
    throw new Error();
  }
};

export default createUserWordAPI;
