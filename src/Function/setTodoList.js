import { toTitleCase } from "../Utilities/toTitleCase";
import toast from "react-hot-toast";

export const setTodoList = (searchName, queryData, setUserData, isSuccess) => {
  const notify = () => toast;
  const data = queryData.data;
  const newList = [];
  const targetTodos = data[0][searchName];

  if (targetTodos.length === 0 && isSuccess)
    notify().error(`${toTitleCase(searchName)} Is Empty ! Try Adding Task !`, {
      id: "Empty",
    });

  setUserData(targetTodos);

  targetTodos.forEach((item) => newList.push(item));
  return newList;
};
