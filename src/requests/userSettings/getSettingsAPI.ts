/* eslint-disable no-console */
import { ISettings } from 'src/requests/interfaceAPI';
import { UrlPath, Headers, Methods, ErrorMessage } from 'src/requests/constantsAPI';

const getSettingsAPI = async (userId: string) => {
  try {
    const rawResponse = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.SETTINGS}`,
      {
        method: `${Methods.GET}`,
        headers: {
          Accept: `${Headers.TYPE}`,
        },
      }
    );

    switch (rawResponse.status) {
      case 401:
      case 404: {
        const res = await rawResponse.text();
        console.error(
          `${res}${
            rawResponse.status === 401 ? ErrorMessage.MISSING_TOKEN : ErrorMessage.SETTING_NOT_FOUND
          }`
        );
        return undefined;
      }
      case 200: {
        const content: ISettings = await rawResponse.json();
        return content;
      }
      default:
        return await rawResponse.json();
    }
  } catch (error) {
    throw new Error();
  }
};

export default getSettingsAPI;
