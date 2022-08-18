import { IWord } from 'src/requests/interfaceAPI';
import { UrlPath, Headers, Methods } from 'src/requests/constantsAPI';

const getWordAPI = async (wordId: number) => {
  try {
    const rawResponse = await fetch(`${UrlPath.BASE}/${UrlPath.WORDS}/${wordId}`, {
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
