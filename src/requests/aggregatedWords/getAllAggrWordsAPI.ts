import { IWord } from 'src/requests/interfaceAPI';
import { UrlPath, Headers, Methods, ResponseStatus, ErrorMessage } from 'src/requests/constantsAPI';
import createError from 'src/requests/createError';

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
      case ResponseStatus.MISSING_TOKEN: {
        throw createError(new Error(ErrorMessage.MISSING_TOKEN), `${ResponseStatus.MISSING_TOKEN}`);
      }
      case ResponseStatus.OK: {
        const words: IWord[] = await response.json();
        return words;
      }
      default:
        return await response.json();
    }
  } catch (err) {
    const error = err as Error;
    if (error.name === `${ResponseStatus.MISSING_TOKEN}`) {
      /* eslint-disable no-console */
      console.error(error);
      return undefined;
    }
    throw error;
  }
};

export default getAllAggrWordsAPI;
