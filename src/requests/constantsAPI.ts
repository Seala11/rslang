export enum UrlPath {
  BASE = ' https://rslang-team54-learnwords.herokuapp.com',
  WORDS = 'words',
  USERS = 'users',
  SIGNIN = 'signin',
  TOKENS = 'tokens',
  AGGREGATED = 'aggregatedWords',
  STATISTICS = 'statistics',
  SETTINGS = 'settings'
}

export enum Headers {
  TYPE = 'application/json',
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export enum ErrorMessage {
  BAD_REQUEST = ': Bad request',
  SETTING_NOT_FOUND = ': Settings not found',
  MISSING_TOKEN = ': Access token is missing or invalid',
}