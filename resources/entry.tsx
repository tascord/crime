import React from "react";
import ReactDOM from "react-dom";

import Index from "../test/app/index";

const Router = () => {
    return <Index/>
    // return (<></>);
}

const app = document.getElementById("root");
ReactDOM.render(<Router />, app);