import { IWord } from 'src/requests/interfaceAPI';
import { UrlPath, Headers, Methods } from 'src/requests/constantsAPI';

const getWordAPI = async (wordId: number) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.WORDS}/${wordId}`, {
      method: `${Methods.GET}`,
      headers: {
        'Content-Type': `${Headers.TYPE}`,
      },
    });
    const word: IWord | undefined = await response.json();

    return word;
  } catch (error) {
    throw new Error();
  }
};

export default getWordAPI;
