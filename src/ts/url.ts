export function toNextURL( _url: string ): string {

    const { origin, pathname, search, hash } = new URL( _url );

    // 1. Remove hash fragment
    if ( hash ) {
        return `${origin}${pathname}${search}`;
    }

    // 2. Remove query parameters
    if ( search ) {
        return `${origin}${pathname}`;
    }

    // 3. Move to parent directory
    if ( pathname && pathname !== "/" ) {
        const nextPath = pathname.split("/").slice(0, -1).join("/");
        return `${origin}${nextPath}`;
    }

   // 4. Remove subdomains and simplify to root domain
    const r = origin.match(/^(https?:\/\/)(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.\/]{2,6})[\:[0-9]*]?[\/]?$/i);
    if ( r && r[3] ) {
        return `${r[1]}${r[3]}`;
    }

    // 5. Return empty string if no transformation is possible
    return "";
}
