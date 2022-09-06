import { IUserWord } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/helpers/constRequestsAPI';

const getAllUserWordsAPI = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.WORDS}`, {
      method: `${Methods.GET}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
        Authorization: `Bearer ${token}`,
      },
    });

    const words: IUserWord[] = await response.json();

    return words;
  } catch (error) {
    throw new Error();
  }
};

export default getAllUserWordsAPI;
