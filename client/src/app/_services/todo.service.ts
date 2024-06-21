import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Todo } from '../_models/todo';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosApiUrl = 'http://localhost:10000/api/todo/';

  private username = 'johndoe';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosApiUrl + this.username);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.todosApiUrl + id);
  }

  createTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Todo>(this.todosApiUrl, todo, {headers});
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Todo>(this.todosApiUrl + todo._id, todo, {headers});
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(this.todosApiUrl + id);
  }
}
