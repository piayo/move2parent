export function toNextURL( _url: string ): string {

    // https://aaa.bbb.piayo.com/aaa/bbb/ccc.html?a=1&b=2#ccc

    const { origin, pathname, search, hash } = new URL( _url );

    // remove hash
    if ( hash ) {
        return `${origin}${pathname}${search}`;
    }

    // remove param
    if ( search ) {
        return `${origin}${pathname}`;
    }

    // to parent directory
    if ( pathname && pathname !== "/" ) {
        const nextPath = pathname.split("/").slice(0, -1).join("/");
        return `${origin}${nextPath}`;
    }

    // remove sub domain
    const r = origin.match(/^(https?:\/\/)(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.\/]{2,6})[\:[0-9]*]?[\/]?$/i);
    if ( r && r[3] ) {
        return `${r[1]}${r[3]}`;
    }

    // nothing...
    return "";
}
