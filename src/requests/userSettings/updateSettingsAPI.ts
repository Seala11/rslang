/* eslint-disable no-console */
import { ISettings } from 'src/requests/interfaceAPI';
import { UrlPath, Headers, Methods, ErrorMessage } from 'src/requests/constantsAPI';

const updateSettingsAPI = async (userId: string, settingsData: ISettings) => {
  try {
    const response = await fetch(
      `${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.SETTINGS}`,
      {
        method: `${Methods.PUT}`,
        headers: {
          Accept: `${Headers.TYPE}`,
          'Content-Type': `${Headers.TYPE}`,
        },
        body: JSON.stringify(settingsData),
      }
    );

    switch (response.status) {
      case 400:
      case 401: {
        const res = await response.text();
        console.error(
            `${res}${
              response.status === 400 ? ErrorMessage.BAD_REQUEST : ErrorMessage.MISSING_TOKEN
            }`
          );
        return undefined;
      }
      case 200: {
        const updatedSettings: ISettings = await response.json();
        return updatedSettings;
      }
      default:
        return await response.json();
    }
  } catch (error) {
    throw new Error();
  }
};

export default updateSettingsAPI;
