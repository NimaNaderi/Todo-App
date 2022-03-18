export const setTodoList = (searchName, queryData) => {
  const data = queryData;
  const newList = [];
  const targetTodos = data ? data[0][searchName] : [];

  targetTodos.forEach((item) => newList.push(item));
  return newList;
};
