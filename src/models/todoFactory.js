import { ToDo } from './todo.js';

export function ToDoFactory(title, description, dueDate, priority) {
  return new ToDo(title, description, dueDate, priority);
}
