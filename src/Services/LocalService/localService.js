const localService = localStorage;

export const localServiceActions = {
  setItem: (key, value) => localService.setItem(key, JSON.stringify(value)),
  getItem: (key) => JSON.parse(localService.getItem(key)),
  removeItem: (key) => localService.removeItem(key),
};

export const isUserAuthenticated =
  localServiceActions.getItem("supabase.auth.token") !== null;
