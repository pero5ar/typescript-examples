// # Generics


// ---

// SLIDE

// ---


// ## Syntax

function genericFunction<T>(arg: T): T {
    return arg;
};
_number = genericFunction<number>(1);

class GenericClass<T> {
    arg: T;

    constructor(arg: T) {
        this.arg = arg
    }
};
let _numberObject = new GenericClass<number>(_number);

interface GenericInterface<T> { arg: T };
let _numberObjectAsInterface: GenericInterface<number> = _numberObject;

type GenericType<T> = { arg: T };
let _numberObjectAsType: GenericType<number> = _numberObject;


// ---

// SLIDE

// ---


// ## Generic Constraints

function deepCopyObject<T extends object>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

let _numberObjectCopy = deepCopyObject(_numberObject);
// let _numberObjectCopy: GenericClass<number>

// let _numberCopy = deepCopyObject(_number)
// result: Argument of type 'number' is not assignable to parameter of type 'object'.ts(2345)


// ---

// SLIDE

// ---


// ## How to type a class?

function createObject<T extends object, CArgs extends any[]>(
    _class: new (...args: CArgs) => T,
    _args: CArgs
): T {
    return new _class(..._args);
}

let _numberObject2 = createObject(GenericClass, [1]);
// let _numberObject2: GenericClass<number>


// ---

// SLIDE

// ---


// ## Default values & React usage

import * as React from 'react';

interface DropdownProps<T extends string | number> {
    defaultValue?: T;
    options: T[];
    onChange: (value: T) => void;
}

class Dropdown<T extends string | number = string> extends React.Component<DropdownProps<T>> {
    // implementation
}

let Element = ({ opts1, opts2 }: { opts1: string[], opts2: number[] }) => {
    const _onChange1 = React.useCallback((val: string) => console.log(val), []);
    // const _onChange1: (val: string) => void

    const _onChange2 = React.useCallback<DropdownProps<number>['onChange']>(
        (val: number) => console.log(val),
        []
    );
    // const _onChange2: (value: number) => void

    return (
        <>
            <Dropdown options={opts1} onChange={_onChange1} />
            <Dropdown<number> options={opts2} onChange={_onChange2} />
            <Dropdown options={opts2} onChange={_onChange2} defaultValue={1} />
        </>
    )
}


// ---

// NEXT

// ---


// ## FORMAT FIX: the _ is not working in tsx

_numberObjectAsInterface
_numberObjectAsType
_numberObjectCopy
_numberObject2
