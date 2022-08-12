import { UrlPath } from "src/requests/interfaceAPI";

const getWordsAPI = async (group: number, page: number) => {
  const rawResponse = await fetch(`${UrlPath.base}/${UrlPath.words}?group=${group}&page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const content = await rawResponse.json();

  console.log(content);
};

export default getWordsAPI;
