// # TS Language Extensions


// ---

// SLIDE

// ---


// ## Type vs interface

// Basically the same thing since TS 2.7

type ObjectType = {
    a: string;
}
interface ObjectInterface {
    a: string;
}

// Key differences:

// 1st: Types are basically aliases
type MyString = string; // you can't map a primitive to an interface
let _myString: MyString; // result: let _myString: string

// 2nd: Interfaces are open to expansion (a.k.a. declaration merging)
interface ObjectInterface {
    a: string;
}
interface ObjectInterface {
    b: string;
}
let _myObject: ObjectInterface;
_myObject!.a // string
_myObject!.b // string

// Side note: Notice the `!` operator, use it wisely

// This throws an error:
// type ObjectType = {
//     b: string;
// }

// Rule of thumb: Use interface for defining objects, and type for complex types
// Please use interfaces when writing libraries


// ---

// SLIDE

// ---


// ## enums

enum StandardIOStream {
    STDIN,
    STDOUT,
    STDERR,
}

StandardIOStream[0] // "STDIN"
StandardIOStream.STDIN // 0

Object.entries(StandardIOStream)
// [["0", "STDIN"], ["1", "STDOUT"], ["2", "STDERR"], ["STDIN", 0], ["STDOUT", 1], ["STDERR", 2]]

// Common use case (avoiding duplicates)

enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
}

Object.entries(Direction).length // 4


// ---

// SLIDE

// ---


// ## keyof, typeof

interface Person {
    firstName: string;
    middleName?: string;
    lastName: string;
}
let _peronProp: keyof Person; // 'firstName' | 'middleName' | 'lastName'

let _john = { firstName: 'John', lastName: 'Smith' }

type Person2 = typeof _john; // { firstName: string; lastName: string; }


// ---

// SLIDE

// ---


// ## Using typeof instead of copy paste

declare function oddlySpecificDeepCopyAsync(
    data: { personInfo: Partial<Person>; direction: Direction | null; /* ... */ }
): Promise<typeof data>


// ---

// SLIDE

// ---


// ## Get type from array

let _mixedArray = [1, 'something', null, [1, 2]];

type MixedArrayElement = (typeof _mixedArray)[number];
// type MixedArrayElement = string | number | number[] | null


// ---

// SLIDE

// ---


// ## Constructing objects via keyof

interface NameUseLookup {
    [name: string]: {
        [key in keyof Person]?: true;
    }
}
let _nameUseLookup: NameUseLookup = {
    'John': { firstName: true, middleName: true },
    'Smith': { lastName: true }
}


// ---

// SLIDE

// ---


// ## Using them on enums

type StandardIOStreamName = keyof typeof StandardIOStream;
// "STDIN" | "STDOUT" | "STDERR"

type StandardIOStreamDict = {
    [name in StandardIOStreamName]: (typeof StandardIOStream)[name]
};
const standardIOStreamDict: StandardIOStreamDict = {
    STDIN: StandardIOStream.STDIN,
    STDOUT: StandardIOStream.STDOUT,
    STDERR: StandardIOStream.STDERR,
    // STDERR: -1, -> be careful, this is valid
}


// ---

// SLIDE

// ---


// ## as const

let _john2 = { firstName: 'John', lastName: 'Smith' } as const;

type JohnSmith = typeof _john2;
// { readonly firstName: "John"; readonly lastName: "Smith"; }

// _john2.firstName = ''
// result: Cannot assign to 'firstName' because it is a read-only property.ts(2540)


// ---

// SLIDE

// ---


// ## readonly

interface ReadonlyPerson {
    readonly firstName: string;
    readonly middleName?: string;
    readonly lastName: string;
}

type ReadonlyPerson2 = Readonly<Person>;

