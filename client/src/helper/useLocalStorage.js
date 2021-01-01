import { useState } from "react";
const useLocalStorage = (key) => {
    const [state, setState] = useState(localStorage.getItem(key));

    const setStorage = (item) => {
        let stringifiedItem = JSON.stringify(item);
        localStorage.setItem(key, stringifiedItem);
        setState(item);
    };

    return [state, setStorage];
};

export default useLocalStorage;
