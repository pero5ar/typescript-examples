// # Custom Utility types


// ---

// SLIDE

// ---


// ###

type Nullable<T> = T | null;


// ---

// SLIDE

// ---


// ###

/**
 * `T | U` with all non matching properties set included as partial
 */
type InclusiveUnion<T, U> = (T | U) & Partial<T> & Partial<U>;


// ---

// SLIDE

// ---


// ###

/**
 * Unwrap `Promise`
 */
type PromiseResult<T> = T extends PromiseLike<infer R> ? R : T;

/**
 * Unwrap `Promise` of an async function's `ReturnType`.
 */
type AwaitReturnType<T extends (...args: any) => any> = PromiseResult<ReturnType<T>>;


// ---

// SLIDE

// ---


// ###

/**
 * Recursive `Readonly<T>` wrapper.
 */
type Immutable<T> = T extends ImmutablePrimitive
    ? T
    : T extends Array<infer U>
        ? ImmutableArray<U>
        : T extends Map<infer K, infer V>
            ? ImmutableMap<K, V>
            : T extends Set<infer M>
                ? ImmutableSet<M>
                : ImmutableObject<T>;

type ImmutablePrimitive = undefined | null | boolean | string | number | symbol | bigint;
type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };


// ---

// SLIDE

// ---


// ###

/**
 * Get all keys of `T` that are type `Type`.
 *
 * Accepts optional, nullable and intersection types, but **not union** types.
 * @example
 * type ExampleType = {
 *     a: 'x';
 *     b: 'x' | null;
 *     c: 'x' | undefined;
 *     d?: 'x';
 *     e: 'x' & 'y';
 *     f: 'x' | 'y';
 * };
 * type ResultType = KeyOfType<ExampleType, 'x'>; // "a" | "b" | "c" | "d" | "e"
 */
declare type KeyOfType<T, Type> = {
    [K in keyof T]: T[K] extends Type ? K : never
}[keyof T];

 /**
  * Get all keys of `T` that are assignable to `Type`.
  *
  * Accepts optional, nullable and union types, but **not intersection** types.
  * @example
  * type ExampleType = {
  *     a: 'x';
  *     b: 'x' | null;
  *     c: 'x' | undefined;
  *     d?: 'x';
  *     e: 'x' & 'y';
  *     f: 'x' | 'y';
  * };
  * type ResultType = KeyWithType<ExampleType, 'x'>; // "a" | "b" | "c" | "d" | "f"
  */
declare type KeyWithType<T, Type> = {
    [K in keyof T]: Type extends T[K] ? K : never
}[keyof T];


// ---

// NEXT

// ---

