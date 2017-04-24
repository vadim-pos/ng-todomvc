import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo.class';

@Component({
    template: `
        <section class="todoapp">
            <app-header></app-header>

            <app-todo-list *ngIf="todos.length" [todos]="todos" [completedTodosCount]="completedTodosCount"></app-todo-list>
            
            <app-footer *ngIf="allTodosCount" (togglePopup)="onTogglePopup($event)" [activeTodosCount]="activeTodosCount" [completedTodosCount]="completedTodosCount" [popupIsShowing]="showSharePopup"></app-footer>

            <app-share-popup *ngIf="showSharePopup" (togglePopup)="onTogglePopup($event)"></app-share-popup>
        </section>
    `
})
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
        this._todosService.todosUpdated.subscribe(todos => {
            if (!todos.length) { this._router.navigate(['']); }
            this.updateTodosData();
        });

        this._route.params.subscribe(params => {
            if (params['sharedData']) {
                this._router.navigate(['']);
                this._todosService.restoreTodos(params['sharedData']);
            }

            this.filter = params['filter'];
            this.updateTodosData();
        });
    }

    updateTodosData() {
        this.todos = this._todosService.getTodos(this.filter);
        this.activeTodosCount = this._todosService.getTodosCount('active');
        this.completedTodosCount = this._todosService.getTodosCount('completed');
        this.allTodosCount = this._todosService.getTodosCount('all');
    }

    onTogglePopup(popupState) {
        this.showSharePopup = popupState;
    }
}
