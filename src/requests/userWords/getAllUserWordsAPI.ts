import { IUserWord } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const getAllUserWordsAPI = async (userId: string) => {
  try {
    const rawResponse = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.WORDS}`, {
      method: `${Methods.GET}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
      },
    });

    const content: IUserWord[] = await rawResponse.json();

    return content;
  } catch (error) {
    throw new Error();
  }
};

export default getAllUserWordsAPI;