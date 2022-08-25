import { IStatistics } from 'src/requests/interfaceAPI';
import {
  Methods,
  UrlPath,
  Headers,
  ResponseStatus,
  ErrorMessage,
} from 'src/helpers/constRequestsAPI';
import createError from 'src/requests/createError';

const updateStatisticsAPI = async (userId: string, statisticsData: IStatistics, token: string) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.STATISTICS}`,
      {
        method: `${Methods.PUT}`,
        headers: {
          Accept: `${Headers.TYPE}`,
          'Content-Type': `${Headers.TYPE}`,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(statisticsData),
      }
    );

    switch (response.status) {
      case ResponseStatus.BAD_REQUEST: {
        throw createError(new Error(ErrorMessage.BAD_REQUEST), `${ResponseStatus.BAD_REQUEST}`);
      }
      case ResponseStatus.MISSING_TOKEN: {
        throw createError(new Error(ErrorMessage.MISSING_TOKEN), `${ResponseStatus.MISSING_TOKEN}`);
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
      error.name === `${ResponseStatus.BAD_REQUEST}` ||
      error.name === `${ResponseStatus.MISSING_TOKEN}`
    ) {
      /* eslint-disable no-console */
      console.error(error);
      return undefined;
    }
    throw error;
  }
};

export default updateStatisticsAPI;
