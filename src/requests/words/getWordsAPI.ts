import { UrlPath, Headers, Methods } from 'src/requests/constantsAPI';

const getWordsAPI = async (group: string, page: string) => {
  try {
    const query = {
      group,
      page,
    };
    const parameters = new URLSearchParams(query);
    const rawResponse = await fetch(
      `${UrlPath.BASE}/${UrlPath.WORDS}?${parameters.toString()}`,
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
