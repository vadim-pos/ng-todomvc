import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo.class';

@Component({
    templateUrl: './main-container.component.html'
})
/**
 * Main container component. Contains nested components and sends them all necessary data received from the todos service. Toggles popup window. Watches for changes in route parameters and todos service.
 */
export class MainContainerComponent implements OnInit {
    filter:string;
    todos:Todo[];

    activeTodosCount:number;
    completedTodosCount:number;
    allTodosCount:number;

    showSharePopup:boolean = false;

    constructor(
        private _todosService:TodosService,
        private _route:ActivatedRoute,
        private _router:Router
    ) {}

    ngOnInit() {
        /* watch for updating data in todos service */
        this._todosService.todosUpdated.subscribe(todos => {
            if (!todos.length) { this._router.navigate(['']); }
            this.getTodosData();
        });
        /* watch for route params change */
        this._route.params.subscribe(params => {
            if (params['sharedData']) {
                this._router.navigate(['']);
                this._todosService.restoreTodos(params['sharedData']);
            } else {
                this.filter = params['filter'];
                this.getTodosData();
            }
        });
    }

    getTodosData() {
        this.todos = this._todosService.getTodos(this.filter);
        this.activeTodosCount = this._todosService.getTodosCount('active');
        this.completedTodosCount = this._todosService.getTodosCount('completed');
        this.allTodosCount = this._todosService.getTodosCount('all');
    }

    onTogglePopup(popupState) {
        this.showSharePopup = popupState;
    }
}
