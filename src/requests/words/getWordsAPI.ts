import { UrlPath, Headers, Methods } from 'src/requests/constantsAPI';

const getWordsAPI = async (group: number, page: number) => {
  try {
    const rawResponse = await fetch(
      `${UrlPath.BASE}/${UrlPath.WORDS}?group=${group}&page=${page}`,
      {
        method: `${Methods.GET}`,
        headers: {
          'Content-Type': `${Headers.TYPE}`,
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
