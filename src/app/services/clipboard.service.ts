import { Injectable } from '@angular/core';

@Injectable()
/**
 * Service is responsible for clipboard operations, in particular - copying data from input elements
 */
export class ClipboardService {
    copyElementValue(element:HTMLInputElement) {
        element.focus();
        element.setSelectionRange(0, element.value.length);
        document.execCommand('copy');
    }
}
