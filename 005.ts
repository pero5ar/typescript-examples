// # Conditional types


// ---

// SLIDE

// ---


// ## Syntax

// SomeType extends OtherType ? TrueType : FalseType;

type FunctionIsObject = Function extends object ? true : false;
// type FunctionIsAnObject = true


// ---

// SLIDE

// ---


// ## Used with generics

type ReadonlyIfObject<T> = T extends object ? Readonly<T> : T;

interface MyObject {
    a: number;
}
let _readonlyMyObject: ReadonlyIfObject<MyObject> = { a: 1 };
// _readonlyMyObject.a = 2;
// Cannot assign to 'a' because it is a read-only property.ts(2540)

let _notReadonlyNumber: ReadonlyIfObject<number> = 1;
// let _notReadonlyNumber: number
_notReadonlyNumber = 2;


// ---

// SLIDE

// ---


// ## infer

let _mixedArray2 = ['something', null, [1, 2]];

type ElementOf<T> = T extends Array<infer E> ? E : T;

type MixedArray2Element = ElementOf<typeof _mixedArray2>;
// type MixedArray2Element = string | number[] | null

type SomeNumber = ElementOf<number>;
// type SomeNumber = number

// N.B.: `infer` always goes between `extends` and `?`


// ---

// SLIDE

// ---


// ## recursive

type ElementOfRecursive<T> = T extends Array<infer E> ? ElementOfRecursive<E> : T;

type MixedArray2ElementRecursive = ElementOfRecursive<typeof _mixedArray2>;
// type MixedArray2ElementRecursive = string | number | null

// NOTE: Some restrictions if < 4.1

// FUN FACT: Recursive type aliases needed to be "hacked" before 3.7 [Nov 2019]
//           3.7 is the one that brought optional chaining and nullish operators


// ---

// SLIDE

// ---


// ## never

type OnlyElementOf<T> = T extends Array<infer E> ? E : never;

type SomeNumber2 = OnlyElementOf<number>;
// type SomeNumber2 = never

declare function elementAt<T>(array: T, index: number): OnlyElementOf<T>;

let _elementAtArray = elementAt(_mixedArray2, 0);
// let _elementAtArray: string | number[] | null

let _elementAtObject = elementAt({ a: 1 }, 0);
// let _elementAtObject: never


// ---

// SLIDE

// ---


// ## Filtering with never

type PrimitiveOnlyElementOf<T> = T extends Array<infer E>
    ? (E extends object ? never : E)
    : never;

type MixedArray2PrimitiveElement = PrimitiveOnlyElementOf<typeof _mixedArray2>;
// type MixedArray2PrimitiveElement = string | null


// ---

// SLIDE

// ---


// ## A useful example

type GetReturnType<T> = T extends (...args: any) => infer R ? R : never;

type DateNowReturnType = GetReturnType<typeof Date.now>;
// type DateNowReturnType = number

let _mixedArray2ElementAt = (index: number) => elementAt(_mixedArray2, index);
type MixedArray2ElementAtResult = GetReturnType<typeof _mixedArray2ElementAt>;
// type MixedArray2ElementAtResult = string | number[] | null


// ---

// SLIDE

// ---


// ## This Already exists

type DateNowReturnType2 = ReturnType<typeof Date.now>
// type DateNowReturnType2 = number

// see 006 for exact definition



// ---

// NEXT

// ---

