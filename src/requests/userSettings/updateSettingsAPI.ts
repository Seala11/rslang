/* eslint-disable no-console */
import { ISettings } from 'src/requests/interfaceAPI';
import { UrlPath, Headers, Methods, ErrorMessage } from 'src/requests/constantsAPI';

const updateSettingsAPI = async (userId: string, settingsData: ISettings) => {
  try {
    const rawResponse = await fetch(
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

    switch (rawResponse.status) {
      case 400:
      case 401: {
        const res = await rawResponse.text();
        console.error(
            `${res}${
              rawResponse.status === 400 ? ErrorMessage.BAD_REQUEST : ErrorMessage.MISSING_TOKEN
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

export default updateSettingsAPI;
