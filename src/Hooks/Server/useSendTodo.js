import { insertTodo } from "../../Services/RemoteService/Actions/insertTodo";
import { updateTodoServer } from "../../Services/RemoteService/Actions/updateTodoServer";
import { useMutation } from "react-query";

export const useUpdateTodo = (searchName) =>
  useMutation((todo) => updateTodoServer(todo, searchName));

export const useInsertTodo = (searchName) =>
  useMutation((todo) => insertTodo(todo, searchName));
