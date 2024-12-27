/**
 * @license
 * Copyright (C) piayo.
 */

import { toNextURL } from "./url";

function onCLickHandler( tab: chrome.tabs.Tab ): void {
    if ( !tab.url || !tab.id ) {
        return;
    }
    const url = toNextURL( tab.url );
    url && chrome.tabs.update({url});
}

chrome.action.onClicked.removeListener( onCLickHandler );
chrome.action.onClicked.addListener( onCLickHandler );
