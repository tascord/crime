import React, { useState, useMemo } from "react";
import { UseStore, entries, set as update, createStore } from "idb-keyval";

const container: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
}

// given this
export function before() {

    let x = 0;

    return (
        <div style={container}>
            <h1>You've clicked the button {x} times</h1>
            <button onClick={() => x++}>Increase?</button>
        </div>
    )
}

// looking to generate this
export default function () {

    const [state, setState] = useState<{ [key: string]: any }>({ x: 0 });
    const [store, setStore] = useState<null | UseStore>();

    // use idb with a store of the project name & the current file hash
    useMemo(async () => {
        const store = createStore('crime', 'index');
        setStore(store);

        const new_state = {};
        (await entries(store))
            .forEach(([key, value]) => state[key.toString()] = value);

        setState({ ...state, ...new_state });

    }, [])

    // wrapped getters and setters that update the state and the store
    const [get, set] = [
        (k: string) => state![k],
        async (k: string, v: any) => {

            console.log(`Setting ${k} to ${v}...`)

            await update(k, v, store!);
            setState({ ...state, [k]: v })
        }
    ]

    // suspense
    if (!store) return <></>;

    // return transformed tsx
    return (
        <div style={container}>
            <h1>You've clicked  the button {state.x} times</h1>
            <button onClick={async () => set('x', 2)}>Increase?</button>
        </div>
    )
}