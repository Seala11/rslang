/* eslint-disable no-console */
import { ISettings } from 'src/requests/interfaceAPI';
import { UrlPath, Headers, Methods, ErrorMessage } from 'src/requests/constantsAPI';

const getSettingsAPI = async (userId: string) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.SETTINGS}`,
      {
        method: `${Methods.GET}`,
        headers: {
          Accept: `${Headers.TYPE}`,
        },
      }
    );

    switch (response.status) {
      case 401:
      case 404: {
        const res = await response.text();
        console.error(
          `${res}${
            response.status === 401 ? ErrorMessage.MISSING_TOKEN : ErrorMessage.SETTING_NOT_FOUND
          }`
        );
        return undefined;
      }
      case 200: {
        const settingsData: ISettings = await response.json();
        return settingsData;
      }
      default:
        return await response.json();
    }
  } catch (error) {
    throw new Error();
  }
};

export default getSettingsAPI;
