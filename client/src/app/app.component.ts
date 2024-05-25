import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Todo } from './_models/todo';
import { TodoService } from './_services/todo.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Node ToDo";
  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }
  
  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  addTodo(newTodo: Todo){
    this.todoService.createTodo(newTodo).subscribe(createdTodo => {
      this.todos.push(createdTodo);
    });
  }

  updateTodo(todo: Todo) {
    const updatedTodo = { ...todo, isDone: !todo.isDone};
    this.todoService.updateTodo(updatedTodo).subscribe(updatedTodo => {
      this.fetchTodos();
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.fetchTodos();
    });
  }

  drop(event: CdkDragDrop<any,any,any>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
}
