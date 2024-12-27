import { expect, describe, it } from "vitest";

import { toNextURL } from "../src/ts/url";

describe( "toNextURL", () => {


    const urls = [
        "https://sub1.sub2.example.com/path1/path2/path3/file.ext?a=1&b=2#cccc",
        "https://sub1.sub2.example.com/path1/path2/path3/file.ext?a=1&b=2",
        "https://sub1.sub2.example.com/path1/path2/path3/file.ext",
        "https://sub1.sub2.example.com/path1/path2/path3",
        "https://sub1.sub2.example.com/path1/path2",
        "https://sub1.sub2.example.com/path1",
        "https://sub1.sub2.example.com",
        "https://example.com",
    ];

    it( "should be remove hash.", () => {
        const prev = urls.at(0)!;
        const next = urls.at(1)!;
        expect( toNextURL( prev ) ).equal( next );
    });

    it( "should be remove param.", () => {
        const prev = urls.at(1)!;
        const next = urls.at(2)!;
        expect( toNextURL( prev ) ).equal( next );
    });

    it( "should be pass all patterns.", () => {
        const checks = urls.slice( 0, -1);
        checks.forEach( ( prev, i) => {
            console.log("...", i, prev, "-> ", urls.at(i+1));
            expect( toNextURL( prev ) ).equal( urls.at(i+1) );
        });
    })

});
