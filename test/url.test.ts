import { expect, describe, it } from "vitest";

import { toNextURL } from "../src/ts/url";

describe("toNextURL", () => {
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

    it("removes the hash fragment from the URL", () => {
        const prev     = urls[0];
        const expected = urls[1];
        expect(toNextURL(prev)).equal(expected);
    });

    it("removes the query parameters from the URL", () => {
        const prev     = urls[1];
        const expected = urls[2];
        expect(toNextURL(prev)).equal(expected);
    });

    it("removes the last path segment from the URL", () => {
        const prev     = urls[2];
        const expected = urls[3];
        expect(toNextURL(prev)).equal(expected);
    });

    it("simplifies the URL step-by-step through all patterns", () => {
        const checks = urls.slice(0, -1); // 最後のURLを除いた配列
        checks.forEach((prev, i) => {
            const expected = urls[i + 1];
            expect(toNextURL(prev)).equal(expected);
        });
    });

    it("simplifies to the root domain", () => {
        const prev     = urls[6];
        const expected = urls[7];
        expect(toNextURL(prev)).equal(expected);
    });

    it("returns the same URL if already at the root domain", () => {
        const prev = urls[7];
        expect(toNextURL(prev)).equal(prev);
    });
});
