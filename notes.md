### Notes and ramblings to check off as I go

- [x] IDB issue (apparently if you update a state to a function it tries to evaluate it)

### Code snippets
```tsx
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
    const [store, setStore] = useState<null | [UseStore]>();

    // use idb with a store of the project name & the current file hash
    useMemo(async () => {
        const created_store = createStore('crime', 'index');
        setStore([created_store]);

        const new_state = {};
        (await entries(created_store))
            .forEach(([key, value]) => state[key.toString()] = value);

        setState({ ...state, ...new_state });

    }, [])

    // wrapped getters and setters that update the state and the store
    const [get, set] = [
        (k: string) => state![k],
        async (k: string, v: any) => {
            await update(k, v, store![0]);
            setState({ ...state, [k]: v })
        }
    ]

    // suspense
    if (!store) return <></>;

    // return transformed tsx
    return (
        <div style={container}>
            <h1>You've clicked  the button {state.x} times</h1>
            <button onClick={async () => set('x', (get('x') || 0) + 1)}>Increase?</button>
        </div>
    )
}
```