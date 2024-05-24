import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Todo } from '../_models/todo';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private headers = new Headers ({'Content-Type': 'application/json'});

  private todosApiUrl = 'http://localhost:3000/api/todos/';

  private username = 'johndoe';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosApiUrl + this.username);
  }
}
