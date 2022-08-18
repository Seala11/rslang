/* eslint-disable no-console */
import { IStatistics } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

const getStatisticsAPI = async (userId: string) => {
  try {
    const rawResponse = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.STATISTICS}`,
      {
        method: `${Methods.GET}`,
        headers: {
          Accept: `${Headers.TYPE}`,
        },
      }
    );

    switch (rawResponse.status) {
      case 401:
      case 404: {
        // Access token is missing or invalid
        // Statistics not found
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

export default getStatisticsAPI;
