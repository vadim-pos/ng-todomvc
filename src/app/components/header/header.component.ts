import { Component } from '@angular/core';

import { TodosService } from '../../services/todos.service';

@Component({
    selector: 'app-header',
    template: `
        <header class="header">
            <h1>todos</h1>
            <input
                [(ngModel)]="newTodoTitle"
                (keyup.enter)="onKeyup()"
                class="new-todo" 
                placeholder="What needs to be done?"
                autofocus
            >
        </header>
    `
})
export class HeaderComponent {
    newTodoTitle:string;

    constructor(private _todosService:TodosService) {}

    onKeyup() {
        // Prevent creation todo from empty string or string of spaces
        if (!this.newTodoTitle || !this.newTodoTitle.trim()) {
            return;
        }
        
        this._todosService.addTodo(this.newTodoTitle.trim());
        this.newTodoTitle = '';
    }
}
