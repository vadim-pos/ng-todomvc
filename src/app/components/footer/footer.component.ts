import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo.class';

@Component({
    selector: 'app-footer',
    template: `
        <footer class="footer">
            <span class="todo-count">
                <strong>{{activeTodosCount}}</strong> item{{(activeTodosCount === 1 ? '':'s')}} left
            </span>

            <ul class="filters">
                <li><a [routerLink]="['']" routerLinkActive="selected" [routerLinkActiveOptions]="{exact:true}">All</a></li>
                <li><a [routerLink]="['', 'active']" routerLinkActive="selected" [routerLinkActiveOptions]="{exact:true}">Active</a></li>
                <li><a [routerLink]="['', 'completed']" routerLinkActive="selected" [routerLinkActiveOptions]="{exact:true}">Completed</a></li>
                <li><a class="share-link" [class.selected]="popupIsShowing" (click)="onShowPopup()">Share!</a></li>
            </ul>

            <button *ngIf="completedTodosCount > 0" (click)="onClearCompleted()" class="clear-completed">Clear completed</button>
        </footer>
    `,
    styles: [`
        .filters li a {
            margin: 3px 0;
        }
        .share-link {
            position: relative;
            font-weight: bold;
            color: #af5b5e;
            cursor: pointer;
        }
        .share-link:after {
            position: absolute;
            width: 100%;
            height: 1px;
            left: 0; bottom: 0;
            background-color: #af5b5e;
            content: '';
        }
        .share-link.selected:after { display: none; }
    `]
})
export class FooterComponent {
    constructor(private _todosService:TodosService) {}

    @Output() togglePopup:EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() activeTodosCount:number;
    @Input() completedTodosCount:number;
    @Input() popupIsShowing:boolean;

    onShowPopup() {
        this.togglePopup.emit(true);
    }

    onClearCompleted() {
        this._todosService.removeCompleted();
    }
}
