import { Component } from '@angular/core';

import { TodosService } from '../../services/todos.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
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
