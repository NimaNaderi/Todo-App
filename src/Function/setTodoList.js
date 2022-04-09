export const setTodoList = (searchName, queryData) => {
  const data = queryData;
  if (!data || !data.length) return false;
  const newList = [];
  const targetTodos = data ? data[0][searchName] : [];

  targetTodos.forEach((item) => newList.push(item));
  return newList;
};
