import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { ClipboardService } from '../../services/clipboard.service';

@Component({
    selector: 'app-share-popup',
    templateUrl: './share-popup.component.html',
    styleUrls: ['./share-popup.component.css']
})
export class SharePopupComponent implements OnInit {
    constructor(private _todosService:TodosService, private _clipboardService:ClipboardService) {}

    @Output() togglePopup:EventEmitter<boolean> = new EventEmitter<boolean>();
    shareUrl:string;
    urlCopied:boolean = false;

    /* Create new url with encoded app state */
    ngOnInit() {
        const urlAddress = `${window.location.origin}${window.location.pathname}`;
        const todosData = this._todosService.getStringifiedTodos();
        this.shareUrl = urlAddress + '#/share/' + todosData;
    }

    onHidePopup() {
        this.togglePopup.emit(false);
    }

    onCopy(urlElement:HTMLInputElement) {
        this._clipboardService.copyElementValue(urlElement);
        this.urlCopied = true;
    }
}
