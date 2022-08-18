/* eslint-disable no-console */
import { IStatistics } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/requests/constantsAPI';

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
      case 401:
      case 404: {
        // Access token is missing or invalid
        // Statistics not found
        const res = await response.text();
        console.error(res);
        return res;
      }
      case 200: {
        const userStatistics: IStatistics = await response.json();
        return userStatistics;
      }
      default:
        return await response.json();
    }
  } catch (error) {
    throw new Error();
  }
};

export default getStatisticsAPI;
