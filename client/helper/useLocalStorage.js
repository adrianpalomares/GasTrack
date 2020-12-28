import { useEffect, useState } from "react";

export default (key) => {
    const [state, setState] = useState(localStorage.getItem(key));

    const setStorage = (item) => {
        localStorage.setItem(key, item);
        setState(item);
    };

    return [state, setStorage];
};
