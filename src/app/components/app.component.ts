import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <p>Created by <a href="https://vadim-pos.github.io">Vadim Postanovkin</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    `
})
export class AppComponent {}
