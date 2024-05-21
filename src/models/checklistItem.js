export class ChecklistItem {
  constructor(description, done = false) {
    this.description = description;
    this.done = done;
  }

  toggleDone() {
    this.done = !this.done;
  }
}
