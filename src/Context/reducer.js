import { localServiceActions } from "../Services/LocalService/localService";

export const authStateActionTypes = {
  newAccessToken: "NEW_ACCESS_TOKEN",
  deleteAccessToken: "DELETE_ACCESS_TOKEN",
  refreshToken: "REFRESH_TOKEN",
};

export const authStateInitialValue = {
  access_token: null,
  refresh_token: null,
};

export const authStateReducerFn = (state, action) => {
  switch (action.type) {
    case authStateActionTypes.newAccessToken:
      localServiceActions.setItem("access_token", action.payload);
      return {
        refresh_token: action.payload.refresh_token,
        access_token: action.payload.access_token,
      };

    case authStateActionTypes.deleteAccessToken:
      localServiceActions.removeItem("access_token");
      return { ...state, access_token: null };

    case authStateActionTypes.refreshToken:
      return { ...state, refresh_token: action.payload };
    default:
      return authStateInitialValue;
  }
};
