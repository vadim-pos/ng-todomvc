import { ITodo } from './todo.interface';

/* Represents single todo item */
export class Todo implements ITodo {
    id:number;
    title:string;
    completed:boolean;

    constructor(todoTitle:string) {
        this.title = todoTitle;
        this.completed = false;
        this.id = +new Date();
    }
};