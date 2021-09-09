// # A few extra Tips


// ---

// SLIDE

// ---


// ## Type the JSON object

// eslint-disable-next-line
interface _Stringified<T> { }
type Stringified<T> = string & _Stringified<T>;

declare interface JSON {
    parse<T = any>(text: Stringified<T>, reviver?: (key: string, value: any) => any): T;
    stringify<T = any>(value: T, replacer?: (key: string, value: any) => any, space?: string | number): Stringified<T>;
    stringify<T = any>(value: T, replacer?: (number | string)[] | null, space?: string | number): Stringified<T>;
}


// ---

// SLIDE

// ---


// ## Export your constants `as const`

// ...so you can mouseover their value

export const APP_MIN_WIDTH = 420 as const;

// and will get a deep readonly:

export const GUEST = {
    ACCOUNT: { id: -1 },
    PERMISSIONS: ['read'],
    PERMISSIONS_AS_STRING: ['read'] as ReadonlyArray<string>,
} as const;


// ---

// SLIDE

// ---


// ## How to write connected props

// store.ts
interface RootStoreState {
    targetReducer: {
        lookup: {
            [id: string]: { id: number; name: string; };
        };
    };
}

// ComponentToConnect/index.tsx
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

interface OwnProps {
    id: number;
}

function mapStateToProps(rootState: RootStoreState, ownProps: OwnProps) {
    return {
        value: rootState.targetReducer.lookup[ownProps.id]
    }
}

const connector = connect(mapStateToProps);

type Props = OwnProps & ConnectedProps<typeof connector>;

class ComponentToConnect extends React.Component<Props> {}


// ---

// SLIDE

// ---


// ## Final words

// 1. Mouseover everything

// 2. Don't be afraid to enter the d.ts files

// 3. Take your time



// ---

// FIN

// ---

