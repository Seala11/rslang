/* eslint-disable no-console */
import { IWord } from 'src/requests/interfaceAPI';
import { UrlPath, Headers, Methods } from 'src/requests/constantsAPI';

const getAllAggrWordsAPI = async (
  userId: string,
  group = '',
  page = '',
  wordsPerPage = '',
  filter = ''
) => {
  try {
    const query = {
      group,
      page,
      wordsPerPage,
      filter,
    };
    const parameters = new URLSearchParams(query);
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.AGGREGATED}?${parameters.toString()}`,
      {
        method: `${Methods.GET}`,
        headers: {
          'Content-Type': `${Headers.TYPE}`,
        },
      }
    );

    switch (response.status) {
      case 401: {
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
