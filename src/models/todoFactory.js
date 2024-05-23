import { ToDo } from './todo';

export function ToDoFactory(title, description, dueDate, priority) {
  return new ToDo(title, description, dueDate, priority);
}
