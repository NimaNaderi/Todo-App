const service = localStorage;

export const localServiceActions = {
  setItem: (key, value) => service.setItem(key, JSON.stringify(value)),
  getItem: (key) => JSON.parse(service.getItem(key)),
  removeItem: (key) => service.removeItem(key),
};
