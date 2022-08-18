import { IWord } from 'src/requests/interfaceAPI';
import { UrlPath } from 'src/requests/constantsAPI';

const getWordAPI = async (id: number) => {
  try {
    const rawResponse = await fetch(`${UrlPath.base}/${UrlPath.words}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const content: IWord | undefined = await rawResponse.json();

    return content;
  } catch (error) {
    throw new Error();
  }
};

export default getWordAPI;
