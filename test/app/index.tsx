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

export default function () {

    let x = 0;

    return (
        <div style={container}>
            <h1>You've clicked the button {x} times</h1>
            <button onClick={() => x++}>Increase?</button>
        </div>
    )
}

