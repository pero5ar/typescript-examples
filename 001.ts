// # Types 101


// ## JS Primitives

let _number: number = 1;
let _string: string = 'value';
let _boolean: boolean = true;
let _symbol: symbol = Symbol();
let _bigint: bigint = BigInt(9007199254740991);
let _undefined: undefined = undefined;

let _null: null = null;


// ## Objects

let _obj1: object = { a: 'value' }; // don't, any non primitive
let _obj2: {} = { a: 'value' }; // don't, basically any
let _obj3: { [key: string]: any; } = { a: 'value' };
let _obj4: Record<string, any> = { a: 'value' };
let _obj5: { a: string; } = { a: 'value' };

type UnknownObject = Record<string, unknown>;
let _obj6: UnknownObject = { a: 'value' };


// ## Functions

let _fun1: Function = (x) => x++; // don't
let _fun2: (...args: any[]) => any = (x) => x++; // you can do better
let _fun3: (x: any) => any = (x) => x++;
let _fun4: (x: number) => number = (x) => x++;

// Remember: functions are objects
let _fun5: object = (x) => x++;
let _fun6: {} = (x) => x++;

// Bur now needs cast to call:
let _callableFun5 = _fun5 as Function;
_callableFun5();


// ## Any, unknown, never

function getA1(obj: any) {
    return obj.a;
}

function getA2(obj: unknown) {
    // return obj.a; -> Property 'a' does not exist on type 'unknown'.ts(2339)
    if (isObjWithA(obj)) {
        // obj is { a: unknown } in this block
        obj.a;
    }
    return undefined;
}

/** This is called a Type Guard */
function isObjWithA(obj: unknown): obj is { a: unknown } {
    // NOTE: null check required only because of config "strictNullChecks": true
    return typeof obj === 'object' && obj !== null && 'a' in obj;
}

function throwError(msg: string): never {
    throw new Error(msg);
}


// ## Literals

let _true: true = true;
let _successfulResponse: 200 | 201 | 204 = 200;
let _flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';

// Template Literals (TS >= 4.1)
let _flexDirection2: `${'row' | 'column'}${'' | '-reverse'}` = 'row';

type LowercaseHttpVerbs = 'get' | 'head' | 'post' | 'put' | 'patch' | 'delete';
type HttpVerbs = LowercaseHttpVerbs | Uppercase<LowercaseHttpVerbs>;
// result: LowercaseHttpVerbs | "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE"
// see: Uppercase, Lowercase, Capitalize, Uncapitalize


// ## Arrays and tuples

let _strArr1: string[] = ['val1', 'val2'];
let _strArr2: Array<string> = ['val1', 'val2'];

let _strOrNumArr1: (number | string)[] = [1, 'val2'];
let _strOrNumArr2: Array<number | string> = [1, 'val2'];

let _tuple1: [string, string] = ['val1', 'val2'];
let _tuple2: [string, number, string] = ['val1', 2, 'val3'];
let _tuple3: [string, number, string?] = ['val1', 2];
let _tuple4: [string, ...number[]] = ['val1', 2, 3, 4];
let _tuple5: [string, ...number[], string] = ['val1', 2, 3, 4, 'val5']; // TS >= 4.2
let _tuple6: [first: string, second: string] = ['val1', 'val2'];