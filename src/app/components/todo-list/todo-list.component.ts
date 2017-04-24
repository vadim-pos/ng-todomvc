import { Component, Input } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo.class';

@Component({
    selector: 'app-todo-list',
    template: `
        <section class="main">
            <input (change)="onToggleAll($event)" [checked]="completedTodosCount === todos.length" id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <app-todo-item *ngFor="let todo of todos" [todo]="todo"></app-todo-item>
            </ul>
        </section>
    `
})
export class TodoListComponent {
    constructor(private _todosService:TodosService) {}

    @Input() todos:Todo[];
    @Input() completedTodosCount:number;

    onToggleAll(e) {
        this._todosService.toggleAll(e.target.checked);        
    }
}
