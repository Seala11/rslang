import { UrlPath, Headers, Methods } from 'src/helpers/constRequestsAPI';

const getAllAggrWordsAPI = async (
  userId: string,
  token: string,
  filter: string,
  wordsPerPage = '20',
) => {
  try {
    const query = {
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
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // const response = await fetch(
    //   `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.AGGREGATED}?${parameters.toString()}`,
    //   {
    //     method: `${Methods.GET}`,
    //     headers: {
    //       'Content-Type': `${Headers.TYPE}`,
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }

    // filter = ''
    // filter,
    // );

    return response;

    // switch (response.status) {
    //   case ResponseStatus.MISSING_TOKEN: {
    //     throw createError(new Error(ErrorMessage.MISSING_TOKEN), `${ResponseStatus.MISSING_TOKEN}`);
    //   }
    //   case ResponseStatus.OK: {
    //     const words: IWord[] = await response.json();
    //     return words;
    //   }
    //   default:
    //     return await response.json();
    // }
  } catch (err) {
    //   const error = err as Error;
    //   if (error.name === `${ResponseStatus.MISSING_TOKEN}`) {
    //     /* eslint-disable no-console */
    //     console.error(error);
    //     return undefined;
    //   }
    //   throw error;
    throw new Error();
  }
};

export default getAllAggrWordsAPI;
