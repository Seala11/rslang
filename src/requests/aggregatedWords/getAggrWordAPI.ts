import { IWord } from 'src/requests/interfaceAPI';
import {
  UrlPath,
  Headers,
  Methods,
  ResponseStatus,
  ErrorMessage,
} from 'src/helpers/constRequestsAPI';
import createError from 'src/requests/createError';

const getAllAggrWordsAPI = async (userId: string, wordId: string, token: string) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.AGGREGATED}/${wordId}`,
      {
        method: `${Methods.GET}`,
        headers: {
          'Content-Type': `${Headers.TYPE}`,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    switch (response.status) {
      case ResponseStatus.NOT_FOUND: {
        throw createError(
          new Error(ErrorMessage.USER_WORD_NOT_FOUND),
          `${ResponseStatus.NOT_FOUND}`
        );
      }
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
    if (
      error.name === `${ResponseStatus.NOT_FOUND}` ||
      error.name === `${ResponseStatus.MISSING_TOKEN}`
    ) {
      /* eslint-disable no-console */
      console.error(error);
      return undefined;
    }
    throw error;
  }
};

export default getAllAggrWordsAPI;
