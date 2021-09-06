// All the basic types one might need

// JS Primitives

let _number: number = 0;
let _string: string = 'str';
let _boolean: boolean = true;
let _symbol: symbol = Symbol();
let _bigint: bigint = BigInt(9007199254740991);
let _undefined: undefined = undefined;
let _null: null = null;

// Objects

let _obj1: object = { a: 'value' };
let _obj2: {} = { a: 'value' };
let _obj3: { [key: string]: any; } = { a: 'value' };
let _obj4: Record<string, any> = { a: 'value' };
let _obj5: { a: string; } = { a: 'value' };

// Functions

let _fun1: Function = (x: number) => x++;
let _fun2: (...args: any[]) => any = (x: number) => x++;
let _fun3: (x: any) => any = (x: number) => x++;
let _fun4: (x: number) => number = (x: number) => x++;

// Any, unknown, never

function getA1(obj: any) {
    return obj.a;
}

function getA2(obj: unknown) {
    // return obj.a; -> Property 'a' does not exist on type 'unknown'.ts(2339)
    if (isObjWithA(obj)) {
        obj.a;
    }
    return undefined;
}

function isObjWithA(obj: unknown): obj is { a: unknown } {
    return typeof obj === 'object' && 'a' in obj;
}

function throwError(msg: string): never {
    throw new Error(msg);
}

// TS Literals

let _true: true = true;
let _successfulResponse: 200 | 201 | 204 = 200;