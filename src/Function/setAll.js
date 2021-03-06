export const setAll = (queryData, setAllData) => {
  if (!queryData) return;

  const data = queryData;
  const allTodos = data.length > 0 ? data[0] : [];
  const realData = Object.values(allTodos);

  for (let index = 0; index < 4; index++) {
    if (realData[index] !== null && realData[index] !== undefined) {
      const currentData = realData[index].map((item) => item);
      const completedTodos = currentData.filter((element) => {
        return element.isComplete;
      });
      setAllData((prevState) => ({
        ...prevState,
        [currentData[0]?._taskCategory]: {
          all: Object.keys(currentData).length,
          completed: completedTodos.length,
        },
      }));
    }
  }
};
