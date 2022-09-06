import { ISettings } from 'src/requests/interfaceAPI';
import {
  UrlPath,
  Headers,
  Methods,
  ErrorMessage,
  ResponseStatus,
} from 'src/helpers/constRequestsAPI';
import createError from 'src/requests/createError';

const updateSettingsAPI = async (userId: string, settingsData: ISettings, token: string) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.SETTINGS}`, {
      method: `${Methods.PUT}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        'Content-Type': `${Headers.TYPE}`,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settingsData),
    });

    switch (response.status) {
      case ResponseStatus.BAD_REQUEST: {
        throw createError(new Error(ErrorMessage.BAD_REQUEST), `${ResponseStatus.BAD_REQUEST}`);
      }
      case ResponseStatus.MISSING_TOKEN: {
        throw createError(new Error(ErrorMessage.MISSING_TOKEN), `${ResponseStatus.MISSING_TOKEN}`);
      }
      case ResponseStatus.OK: {
        const updatedSettings: ISettings = await response.json();
        return updatedSettings;
      }
      default:
        return await response.json();
    }
  } catch (err) {
    const error = err as Error;
    if (
      error.name === `${ResponseStatus.MISSING_TOKEN}` ||
      error.name === `${ResponseStatus.NOT_FOUND}`
    ) {
      /* eslint-disable no-console */
      console.error(error);
      return undefined;
    }
    throw error;
  }
};

export default updateSettingsAPI;
