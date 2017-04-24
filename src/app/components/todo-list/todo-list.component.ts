import { Component, Input } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo.class';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
    constructor(private _todosService:TodosService) {}

    @Input() todos:Todo[];
    @Input() completedTodosCount:number;

    onToggleAll(e) {
        this._todosService.toggleAll(e.target.checked);        
    }
}
