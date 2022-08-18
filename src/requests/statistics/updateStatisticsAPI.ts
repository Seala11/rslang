/* eslint-disable no-console */
import { IStatistics } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const updateStatisticsAPI = async (userId: string, statisticsData: IStatistics) => {
  try {
    const rawResponse = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.STATISTICS}`,
      {
        method: `${Methods.PUT}`,
        headers: {
          Accept: `${Headers.TYPE}`,
          'Content-Type': `${Headers.TYPE}`,
        },
        body: JSON.stringify(statisticsData),
      }
    );

    switch (rawResponse.status) {
      case 400:
      case 401: {
        // Bad request
        // Access token is missing or invalid
        const res = await rawResponse.text();
        console.error(res);
        return res;
      }
      case 200: {
        const content: IStatistics = await rawResponse.json();
        return content;
      }
      default:
        return await rawResponse.json();
    }
  } catch (error) {
    throw new Error();
  }
};

export default updateStatisticsAPI;