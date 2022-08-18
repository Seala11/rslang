import { UrlPath } from 'src/requests/constantsAPI';

const getWordsAPI = async (group: number, page: number) => {
  try {
    const rawResponse = await fetch(
      `${UrlPath.base}/${UrlPath.words}?group=${group}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const content = await rawResponse.json();

    return content;
  } catch (error) {
    throw new Error();
  }
};

export default getWordsAPI;
