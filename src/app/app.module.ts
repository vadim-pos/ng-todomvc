import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { TodosService } from './services/todos.service';
import { ClipboardService } from './services/clipboard.service';

import { routes } from './routes';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { SharePopupComponent } from './components/share-popup/share-popup.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoListComponent,
        TodoItemComponent,
        HeaderComponent,
        FooterComponent,
        MainContainerComponent,
        SharePopupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes, {useHash: true})
    ],
        providers: [TodosService, ClipboardService],
        bootstrap: [AppComponent]
})
export class AppModule { }
