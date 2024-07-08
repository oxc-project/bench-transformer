// Files from https://github.com/microsoft/TypeScript/blob/main/tests/cases/transpile

export const a = 1;
export let b = 2;
export var c = 3;
using d = undefined;
export { d };
await using e = undefined;
export { e };
// @filename: interface.ts
export interface Foo {
    a: string;
    readonly b: string;
    c?: string;
}
// @filename: class.ts
const i = Symbol();
export class Bar {
    a: string;
    b?: string;
    declare c: string;
    #d: string;
    public e: string;
    protected f: string;
    private g: string;
    ["h"]: string;
}

export abstract class Baz {
    abstract a: string;
    abstract method(): void;
}
// @filename: namespace.ts
export namespace ns {
    namespace internal {
        export class Foo {}
    }
    export namespace nested {
        export import inner = internal;
    }
}
// @filename: alias.ts
export type A<T> = { x: T };


type T = number[]
export function fnDeclBasic1(p: number[] | string[] | [T] = [], rParam: string): void { };
export function fnDeclBasic2(p: (n: T) => T = () => null!, rParam: string): void { };
export function fnDeclBasic3(p: new () => any = class {}, rParam: string): void { };
export function fnDeclBasic4(p: [T] = [[]], rParam: string): void { };
export function fnDeclBasic5(p: { a: T } = { a: [] }, rParam: string): void { };
export function fnDeclBasic6(p: `_${string}` = "_", rParam: string): void { };
export function fnDeclBasic7(p: { a?: string } & number[] = [], rParam: string): void { };
export function fnDeclBasic8(p: (number[] | string[]) | number = [], rParam: string): void { };

export function fnDeclHasUndefined(p: T | undefined = [], rParam: string): void { };

export const fnExprOk1 = function (array: number[] = [], rParam: string): void { };
export const fnExprOk2 = function (array: T | undefined = [], rParam: string): void { };

export const arrowOk1 = (array: number[] = [], rParam: string): void => { };
export const arrowOk2 = (array: T | undefined = [], rParam: string): void => { };

export const inObjectLiteralFnExprOk1 = { o: function (array: number[] = [], rParam: string): void { } };
export const inObjectLiteralFnExprOk2 = { o: function (array: T | undefined = [], rParam: string): void { } };

export const inObjectLiteralArrowOk1 = { o: (array: number[] = [], rParam: string): void => { } };
export const inObjectLiteralArrowOk2 = { o: (array: T | undefined = [], rParam: string): void => { } };

export const inObjectLiteralMethodOk1 = { o(array: number[] = [], rParam: string): void { } };
export const inObjectLiteralMethodOk2 = { o(array: T | undefined = [], rParam: string): void { } };


export class InClassFnExprOk1 { o = function (array: number[] = [], rParam: string): void { } };
export class InClassFnExprOk2 { o = function (array: T | undefined = [], rParam: string): void { } };

export class InClassArrowOk1 { o = (array: number[] = [], rParam: string): void => { } };
export class InClassArrowOk2 { o = (array: T | undefined = [], rParam: string): void => { } };

export class InClassMethodOk1 { o(array: number[] = [], rParam: string): void { } };
export class InClassMethodOk2 { o(array: T | undefined = [], rParam: string): void { } };

const x = "";
export function one() {
    return {} as typeof x;
}


// @fileName: v1.ts
export const v1 = (...a: [n: "n", a: "a"]): {
    /** r rest param */
    a: typeof a,
} => {
    return null!
}

export const object = {
    foo: <T extends Set<T> | []>(): void => { },
};

export const x1: MissingGlobalType = null!;
export const fn = (a: MissingGlobalType): MissingGlobalType => null!;
export const fn2 = (a: MissingGlobalType) => null! as MissingGlobalType;

export const x2: typeof missingGlobalValue = null!;
export const fn3 = (a: typeof missingGlobalValue): typeof missingGlobalValue => null!;
export const fn4 = (a: typeof missingGlobalValue) => null! as typeof missingGlobalValue;


export const o : {
    [missingGlobalValue]: string
} = null!;

export const c1: number = 1;

export interface A1 {
    x: number;
}

let expr: { x: number; };

expr = {
    x: 12,
}

export default expr;
