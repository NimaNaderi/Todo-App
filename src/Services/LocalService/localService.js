const service = localStorage;

export const localServiceActions = {
  setItem: (key, value) => service.setItem(key, JSON.stringify(value)),
  getItem: (key) => JSON.parse(service.getItem(key)),
  removeItem: (key) => service.removeItem(key),
};

export const isUserAuthenticated =
  localServiceActions.getItem("supabase.auth.token") !== null;