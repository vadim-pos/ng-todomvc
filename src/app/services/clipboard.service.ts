import { Injectable } from '@angular/core';

@Injectable()
export class ClipboardService {
    copyElementValue(element:HTMLInputElement) {
        element.focus();
        element.setSelectionRange(0, element.value.length);
        document.execCommand('copy');
    }

}
