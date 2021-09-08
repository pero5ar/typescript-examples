// # Unions and Intersections


// ## Basic example

type SingleDigitPrime = 2 | 3 | 5 | 7;
type SingleDigitOdd = 1 | 3 | 5 | 7 | 9;

type SingleDigitPrimeOrOdd = SingleDigitPrime | SingleDigitOdd;
// result: 2 | 3 | 5 | 7 | 1 | 9

type SingleDigitPrimeAndOdd = SingleDigitPrime & SingleDigitOdd;
// result: 3 | 5 | 7


// ## Object union

// Basically an or operator

type Human = { firstName: string; lastName: string; address: string; oib: string; };
interface Company { companyName: string; address: string; oib: string; };

declare function verifyOIB(oib: string): boolean;
// declare = I'm to lazy to write a function body

function payTaxes(entity: Human | Company): void {
    verifyOIB(entity.oib);
    // entity.companyName; -> Property 'companyName' does not exist on type 'Human'.ts(2339)

    let name: string;
    if ('companyName' in entity) {
        // `entity: Company` in this block
        name = entity.companyName;
    } else {
        // `entity: Human` in this block
        name = entity.firstName + ' ' + entity.lastName;
    }
    // other stuff...
}


// # Object intersection

interface DbModel { id: number; }
type ChildObject = { parentId: number; };

type ChildDbModel = DbModel & ChildObject;

function addChild(parentId: number, child: DbModel): ChildDbModel {
    return {
        ...child,
        parentId,
    }
}


// ## Narrowing down types with intersections

type Bipedal = { usesFourLegs: false; usesTwoLegs: true; };
type Quadrupedal = { usesFourLegs: true; usesTwoLegs: false; };

type Dinosaur = (Bipedal | Quadrupedal) & {
    laysEggs: true;
    haveFeathers?: boolean;
    canFly?: boolean; warmBlooded?: boolean
};

type Theropod = Dinosaur & Bipedal;
const tRex: Theropod = {
    canFly: false,
    laysEggs: true,
    usesFourLegs: false,
    usesTwoLegs: true,
};

type Bird = Theropod & { haveFeathers: true; canFly: boolean; warmBlooded: true; };
const chicken: Bird = { 
    canFly: false,
    haveFeathers: true,
    laysEggs: true,
    usesFourLegs: false,
    usesTwoLegs: true,
    warmBlooded: true,
};


// ## Side note: optional is not the same as undefined

let _obj7: { a?: string } = {};

// let _obj7: { a: string | undefined } = {};
// result: Property 'a' is missing in type '{}' but required in type '{ a: string | undefined; }'.ts(2741)


// ## interface extends

// Basically the same as object intersections

interface Bird2 extends Theropod {
    haveFeathers: true;
    canFly: boolean;
    warmBlooded: true;
}
const chicken2: Bird2 = chicken;

// But with restrictions

// interface Bird3 extends Dinosaur {}
// result: An interface can only extend an object type or intersection of object types with statically known members.ts(2312)


// ## A "real" union of objects

// Goal: shared types are required and individual ones are optional

type LegalEntity = (Human | Company) & Partial<Human> & Partial<Company>;

function payTaxes2(entity: LegalEntity): void {
    verifyOIB(entity.oib);

    const name: string = entity.companyName ?? ((entity.firstName ?? '') + ' ' + (entity.lastName ?? ''));
    // other stuff...
}


// ## Side note: JS nullish coalescing && optional chaining

function old_getChildId(parent: any): number | null {
    if (parent === null || parent === undefined) return null;
    if (parent.child === null || parent.child === undefined) return null;
    // NOTE: Can't use `parent.child.id || null`, because id can be 0
    if (parent.child.id === null || parent.child.id === undefined) return null;
    return parent.child.id;
}

function new_getChildId(parent: any): number | null {
    return parent?.child?.name ?? null;
}

globalThis.notSureIfThisFunctionExists?.();

