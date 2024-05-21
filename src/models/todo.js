export class ToDo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = [];
  }

  addChecklistItem(item) {
    this.checklist.push(item);
  }

  removeChecklistItem(index) {
    this.checklist.splice(index, 1);
  }
}
