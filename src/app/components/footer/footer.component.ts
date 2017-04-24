import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo.class';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
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
