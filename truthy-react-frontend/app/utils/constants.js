export const RESTART_ON_REMOUNT = "@@saga-injector/restart-on-remount";
export const DAEMON = "@@saga-injector/daemon";
export const ONCE_TILL_UNMOUNT = "@@saga-injector/once-till-unmount";

export const POST = "post";
export const GET = "get";
export const DELETE = "delete";
export const PUT = "put";

export const StatusCodesList = {
  Success: 1001,
  ValidationError: 1002,
  InternalServerError: 1003,
  NotFound: 1004,
  UnauthorizedAccess: 1005,
  TokenExpired: 1006,
  TooManyTries: 1007,
  ServiceUnAvailable: 1008,
  ThrottleError: 1009,
  Forbidden: 1010,
  IncorrectOldPassword: 1011,
  UserInactive: 1012,
  BadRequest: 1013,
  InvalidCredentials: 1014,
  InvalidRefreshToken: 1015,
  UnsupportedFileType: 1016,
  OtpRequired: 1017,
  defaultItemDeleteError: 1018,
  RefreshTokenExpired: 1019,
};
