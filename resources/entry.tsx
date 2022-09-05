import React from "react";
import { createRoot } from "react-dom/client";

import Index from "../test/app/index";

const Router = () => {
    return <Index />
}

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<Router />);