// @strict: true

// Repro from #21975

interface Foo {
    bar: {
        baz: string;
    } | {
        qux: number;
    }
}

type ShouldBeString = Foo['bar']['baz'];

interface HasOptionalMember {
    bar?: {
        baz: string;
    }
}

type ShouldBeString2 = HasOptionalMember['bar']['baz'];
