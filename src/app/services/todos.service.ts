import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { Todo } from '../models/todo.class';

@Injectable()
/**
 * Service performs all necessary operations with todos data and notifies subscribed components after each one.
 */
export class TodosService {
    private _todos:Todo[];
    todosUpdated:Subject<Todo[]> = new Subject<Todo[]>();

    constructor() {
        this._todos = JSON.parse(localStorage.getItem('todos-[postanovkin]')) || [];
        this.todosUpdated.next(this._todos);
    }

    private _saveTodos() {
        localStorage.setItem('todos-[postanovkin]', JSON.stringify(this._todos));
    }

    getTodos(filter:string):Todo[] {
        switch (filter) {
            case 'active':
                return this._todos.filter(todo => !todo.completed);
            case 'completed':
                return this._todos.filter(todo => todo.completed);
            case 'all': default:
                return this._todos;
        }
    }

    getTodosCount(filter:string):number {
        return this.getTodos(filter).length;
    }

    getStringifiedTodos():string {
        return encodeURIComponent(JSON.stringify(this._todos));
    }

    addTodo(todoTitle:string) {
        this._todos.push(new Todo(todoTitle));
        this._saveTodos();
        this.todosUpdated.next(this._todos);
    }

    toggleTodoCompletion(todoId:number) {
        let todo = this._todos.find(todo => todo.id === todoId);

        todo.completed = !todo.completed;
        this._saveTodos();
        this.todosUpdated.next(this._todos);
    }

    toggleAll(completionStatus:boolean) {
        this._todos.map(todo => todo.completed = completionStatus);
        this._saveTodos();
        this.todosUpdated.next(this._todos);
    }

    removeTodo(todoId:number) {
        this._todos = this._todos.filter(todo => todo.id !== todoId);
        this._saveTodos();
        this.todosUpdated.next(this._todos);
    }

    updateTodoTitle(todoId:number, todoTitle:string) {
        let todo = this._todos.find(todo => todo.id === todoId);
        todo.title = todoTitle;
        this._saveTodos();
    }

    removeCompleted() {
        this._todos = this._todos.filter(todo => !todo.completed);
        this._saveTodos();
        this.todosUpdated.next(this._todos);
    }

    restoreTodos(todos:string) {
        this._todos = JSON.parse(todos);
        this._saveTodos();
        this.todosUpdated.next(this._todos);
    }
}