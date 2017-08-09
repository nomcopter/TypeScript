//// [deferredLookupTypeResolution.ts]
// Repro from #17456

type StringContains<S extends string, L extends string> = (
    { [K in S]:      'true' } &
    { [key: string]: 'false' }
  )[L]

type ObjectHasKey<O, L extends string> = StringContains<keyof O, L>

type First<T> = ObjectHasKey<T, '0'>;  // Should be deferred

type T1 = ObjectHasKey<{ a: string }, 'a'>;  // 'true'
type T2 = ObjectHasKey<{ a: string }, 'b'>;  // 'false'

// Verify that mapped type isn't eagerly resolved in type-to-string operation

declare function f1<A extends string, B extends string>(a: A, b: B): { [P in A | B]: any };

function f2<A extends string>(a: A) {
    return f1(a, 'x');
}

function f3(x: 'a' | 'b') {
    return f2(x);
}


//// [deferredLookupTypeResolution.js]
"use strict";
// Repro from #17456
function f2(a) {
    return f1(a, 'x');
}
function f3(x) {
    return f2(x);
}


//// [deferredLookupTypeResolution.d.ts]
declare type StringContains<S extends string, L extends string> = ({
    [K in S]: 'true';
} & {
    [key: string]: 'false';
})[L];
declare type ObjectHasKey<O, L extends string> = StringContains<keyof O, L>;
declare type First<T> = ObjectHasKey<T, '0'>;
declare type T1 = ObjectHasKey<{
    a: string;
}, 'a'>;
declare type T2 = ObjectHasKey<{
    a: string;
}, 'b'>;
declare function f1<A extends string, B extends string>(a: A, b: B): {
    [P in A | B]: any;
};
declare function f2<A extends string>(a: A): {
    [P in A | "x"]: any;
};
declare function f3(x: 'a' | 'b'): {
    a: any;
    b: any;
    x: any;
};
