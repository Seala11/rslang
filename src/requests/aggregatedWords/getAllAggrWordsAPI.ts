import { UrlPath, Headers, Methods } from 'src/helpers/constRequestsAPI';

const getAllAggrWordsAPI = async (
  userId: string,
  token: string,
  filter: string,
  wordsPerPage = '20'
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

    return response;
  } catch (err) {
    throw new Error();
  }
};

export default getAllAggrWordsAPI;
