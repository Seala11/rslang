import { IWord } from 'src/requests/interfaceAPI';
import { UrlPath, Headers, Methods } from 'src/requests/constantsAPI';

const getWordAPI = async (id: number) => {
  try {
    const rawResponse = await fetch(`${UrlPath.BASE}/${UrlPath.WORDS}/${id}`, {
      method: `${Methods.GET}`,
      headers: {
        'Content-Type': `${Headers.TYPE}`,
      },
    });
    const content: IWord | undefined = await rawResponse.json();

    return content;
  } catch (error) {
    throw new Error();
  }
};

export default getWordAPI;
