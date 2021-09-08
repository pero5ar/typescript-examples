// # Utility Types

// https://www.typescriptlang.org/docs/handbook/utility-types.html


// ---

// SLIDE

// ---


// ## What we know


// ---

// SLIDE

// ---


// ### ReturnType

type _ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;


// ---

// SLIDE

// ---


// ### Record

type _Record<K extends keyof any, T> = {
    [P in K]: T;
};

type ThisIsARecord = Record<string, number[]>;

type ThisIsARecordResult = {
    [x: string]: number[];
};


// ---

// SLIDE

// ---


// ### Partial

type _Partial<T> = {
    [P in keyof T]?: T[P];
};

type ThisIsAPartialObject = Partial<{ a: number; b: string; }>;

type ThisIsAPartialObjectResult = {
    a?: number;
    b?: string;
};


// ---

// SLIDE

// ---


// ### Readonly

type _Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type ThisIsAReadonlyObject = Readonly<{ a: number; b: string; }>;

type ThisIsAReadonlyObjectResult ={
    readonly a: number;
    readonly b: string;
};


// ---

// SLIDE

// ---


// ## Several others

// ---

// SLIDE

// ---


// ### Required

type _Required<T> = {
    [P in keyof T]-?: T[P];
};

type ThisIsTheOppositeOfPartial = Required<ThisIsAPartialObjectResult>

type ThisIsTheOppositeOfPartialResult = {
    a: number;
    b: string;
};


// ---

// SLIDE

// ---


// ### Parameters

type _Parameters<T extends (...args: any) => any> = 
    T extends (...args: infer P) => any ? P : never;

type ArrayMapParameters = Parameters<typeof Array['prototype']['map']>;
// [callbackfn: (value: any, index: number, array: any[]) => unknown, thisArg?: any]


// ---

// SLIDE

// ---


// ### ConstructorParameters

type _ConstructorParameters<T extends abstract new (...args: any) => any> =
    T extends abstract new (...args: infer P) => any ? P : never;

type DateConstructorParameters = ConstructorParameters<DateConstructor>; 
// [value: string | number | Date]


// ---

// SLIDE

// ---


// ### Pick

type _Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type ObjectWithA = Pick<{ a: number; b: string; }, 'a'>;
// { a: number; }


// ---

// SLIDE

// ---


// ### Omit

type _Exclude<T, U> = T extends U ? never : T;

type _Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type ObjectWithoutA = Omit<{ a: number; b: string; }, 'a'>;
// { b: string; }


// ---

// SLIDE

// ---


// ### NonNullable

type _NonNullable<T> = T extends null | undefined ? never : T;

// useless if "strictNullChecks": false

type ThisObjectAlwaysExists = NonNullable<{ a: number } | null>;
// { a: number; }



// ---

// NEXT

// ---

