import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/_models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Output() newTodo = new EventEmitter<Todo>();
  newTodoTitle = "";

  submitTodo() {
    if(this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        _id: '',
        todo: this.newTodoTitle,
        isDone: false,
        hasAttachment: false
      };
      this.newTodo.emit(newTodo);
      this.newTodoTitle = '';
    }
  }
}
