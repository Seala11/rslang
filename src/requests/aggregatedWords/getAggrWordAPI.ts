/* eslint-disable no-console */
import { IWord } from 'src/requests/interfaceAPI';
import { UrlPath, Headers, Methods } from 'src/requests/constantsAPI';

const getAllAggrWordsAPI = async (userId: string, wordId: string) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.AGGREGATED}/${wordId}`,
      {
        method: `${Methods.GET}`,
        headers: {
          'Content-Type': `${Headers.TYPE}`,
        },
      }
    );

    switch (response.status) {
      case 404:
      case 401: {
        // User's word not found
        // Access token is missing or invalid
        const res = await response.text();
        console.error(res);
        return res;
      }
      case 200: {
        const words: IWord[] = await response.json();
        return words;
      }
      default:
        return await response.json();
    }
  } catch (error) {
    throw new Error();
  }
};

export default getAllAggrWordsAPI;
