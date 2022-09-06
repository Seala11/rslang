import { Methods, UrlPath, Headers } from 'src/helpers/constRequestsAPI';

const getStatisticsAPI = async (userId: string, token: string) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.STATISTICS}`,
      {
        method: `${Methods.GET}`,
        headers: {
          Accept: `${Headers.TYPE}`,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (err) {
    throw new Error();
  }
};

export default getStatisticsAPI;
