import { IUser, UrlPath } from 'src/requests/interfaceAPI';

const createUserAPI = async (user: IUser) => {
  const rawResponse = await fetch(`${UrlPath.base}/${UrlPath.users}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const content = await rawResponse.json();

  console.log(content);
};

export default createUserAPI;
