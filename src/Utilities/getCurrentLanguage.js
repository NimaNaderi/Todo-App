import { localServiceActions } from "../Services/LocalService/localService";

export const getCurrentLanguage = () => localServiceActions.getItem("Language");
