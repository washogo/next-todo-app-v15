import { TodoListType } from './todo.types';

export type TodoApiSuccessResponse = TodoListType;

export type TodoApiErrorResponse = {
  error: string;
};

export type TodoApiResponse = TodoApiSuccessResponse | TodoApiErrorResponse;