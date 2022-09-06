import { ISettings } from 'src/requests/interfaceAPI';
import {
  UrlPath,
  Headers,
  Methods,
  ErrorMessage,
  ResponseStatus,
} from 'src/helpers/constRequestsAPI';
import createError from 'src/requests/createError';

const getSettingsAPI = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${UrlPath.BASE}/${UrlPath.USERS}/${userId}/${UrlPath.SETTINGS}`, {
      method: `${Methods.GET}`,
      headers: {
        Accept: `${Headers.TYPE}`,
        Authorization: `Bearer ${token}`,
      },
    });

    switch (response.status) {
      case ResponseStatus.MISSING_TOKEN: {
        throw createError(new Error(ErrorMessage.MISSING_TOKEN), `${ResponseStatus.MISSING_TOKEN}`);
      }
      case ResponseStatus.NOT_FOUND: {
        throw createError(new Error(ErrorMessage.SETTING_NOT_FOUND), `${ResponseStatus.NOT_FOUND}`);
      }
      case ResponseStatus.OK: {
        const settingsData: ISettings = await response.json();
        return settingsData;
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

export default getSettingsAPI;
