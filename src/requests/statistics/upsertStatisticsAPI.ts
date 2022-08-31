import { IStatistics } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/helpers/constRequestsAPI';

const upsertStatisticsAPI = async (userId: string, token: string, statisticsData: IStatistics) => {
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

    return response;
  } catch (err) {
    throw new Error();
  }
};

export default upsertStatisticsAPI;
