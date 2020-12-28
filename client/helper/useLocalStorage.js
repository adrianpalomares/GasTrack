import { useEffect, useState } from "react";

export default (key) => {
    const [state, setState] = useState(localStorage.getItem(key));

    const setStorage = (item) => {
        let stringifiedItem = JSON.stringify(item);
        localStorage.setItem(key, stringifiedItem);
        setState(item);
    };

    return [state, setStorage];
};
