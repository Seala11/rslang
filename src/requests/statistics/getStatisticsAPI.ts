import { IStatistics } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers, ResponseStatus, ErrorMessage } from 'src/requests/constantsAPI';
import createError from 'src/requests/createError';

const getStatisticsAPI = async (userId: string) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.STATISTICS}`,
      {
        method: `${Methods.GET}`,
        headers: {
          Accept: `${Headers.TYPE}`,
        },
      }
    );

    switch (response.status) {
      case ResponseStatus.MISSING_TOKEN: {
        throw createError(new Error(ErrorMessage.MISSING_TOKEN), `${ResponseStatus.MISSING_TOKEN}`);
      }
      case ResponseStatus.NOT_FOUND: {
        throw createError(
          new Error(ErrorMessage.STATISTICS_NOT_FOUND),
          `${ResponseStatus.NOT_FOUND}`
        );
      }
      case ResponseStatus.OK: {
        const userStatistics: IStatistics = await response.json();
        return userStatistics;
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

export default getStatisticsAPI;
