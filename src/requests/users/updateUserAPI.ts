import { IUser, IUserSignIn } from 'src/requests/interfaceAPI';
import { Methods, UrlPath, Headers } from 'src/helpers/constRequestsAPI';

const updateUserAPI = async (userData: IUserSignIn, id: string) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${id}`, {
      method: `${Methods.PUT}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
      },
      body: JSON.stringify(userData),
    });

    const userUpdatedData: IUser = await response.json();

    return userUpdatedData;
  } catch (error) {
    throw new Error();
  }
};

export default updateUserAPI;
