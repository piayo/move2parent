/**
 * @license
 * Copyright (C) piayo.
 */

import { toNextURL } from "./url";

async function onCLickHandler( tab: chrome.tabs.Tab ): Promise<void> {
    if ( !tab.url || !tab.id ) {
        return;
    }
    const url = toNextURL( tab.url );
    if ( !url ) {
        return;
    }
    try {
        await chrome.tabs.update({ url });
    }
    catch ( err: any ) {
        console.log(err);
    }
}


function onActivatedHandler(info: chrome.tabs.TabHighlightInfo): void {
    if ( !info || !info.tabIds || !info.tabIds.at(0) ) {
        return;
    }
    try {
        chrome.scripting.executeScript(
            {
                target: { tabId: info.tabIds.at(0)! },
                func: () => window.matchMedia("(prefers-color-scheme: dark)").matches,
            },
            results => {
                const color = results?.at(0)?.result ? "dark" : "light";
                chrome.action.setIcon({
                    path: {
                        32 : `../img/icon_032_${color}.png`,
                        64 : `../img/icon_064_${color}.png`,
                    },
                });
            }
        );
    }
    catch ( err ) {
        console.log(err);
    }
}


chrome.action.onClicked.removeListener( onCLickHandler );
chrome.action.onClicked.addListener( onCLickHandler );

chrome.tabs.onHighlighted.removeListener(onActivatedHandler);
chrome.tabs.onHighlighted.addListener(onActivatedHandler);
