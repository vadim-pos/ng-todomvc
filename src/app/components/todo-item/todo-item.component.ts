import { Component, Input } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo.class';

@Component({
    selector: 'app-todo-item',
    template: `
        <li [ngClass]="{completed: todo.completed, editing: editingMode}">
            <div class="view">
                <input
                    (change)="onCompletionChange()"
                    [checked]="todo.completed"
                    class="toggle"
                    type="checkbox">
                <label (dblclick)="onEditingStart(editingInput)">{{todo.title}}</label>
                <button (click)="onRemove()" class="destroy"></button>
            </div>
            <input 
                #editingInput
                class="edit"
                value={{todo.title}}
                (blur)="onEditingDone(editingInput.value)"
                (keyup.enter)="onEditingDone(editingInput.value)"
                (keyup.escape)="onEditingCancel(editingInput)">
        </li>
    `
})
export class TodoItemComponent {
    constructor(private _todosService:TodosService) {}

    @Input() todo:Todo;
    editingMode:boolean = false;

    onCompletionChange() {
        this._todosService.toggleTodoCompletion(this.todo.id);
    }

    onRemove() {
        this._todosService.removeTodo(this.todo.id);
    }

    onEditingStart(editingElement:HTMLInputElement) {
        this.editingMode = true;
        setTimeout(() => { editingElement.focus(); }, 0);
    }

    onEditingDone(newTitle:string) {
        switch(newTitle.trim()) {
            case '':
               this._todosService.removeTodo(this.todo.id);
               break;
            case this.todo.title:
                this.editingMode = false;
                break;
            default:
                this._todosService.updateTodoTitle(this.todo.id, newTitle);
                this.editingMode = false;
        }
    }

    onEditingCancel(editingElement:HTMLInputElement) {
        editingElement.value = this.todo.title;
    }
}