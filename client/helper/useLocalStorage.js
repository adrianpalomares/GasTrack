import { useEffect, useState } from "react";

export default (key, value) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        // Value exists
        if (localStorage.getItem(key) != null) {
            setState(localStorage.getItem(key));
        } else {
            localStorage.setItem(key, value);
            setState(value);
        }
    }, []);

    const setStorage = (value) => {
        if (value == null) {
            removeStorage();
        } else {
            setState(value);
            const stringifiedValue = JSON.stringify(value);
            localStorage.setItem(key, stringifiedValue);
        }
    };

    const removeStorage = () => {
        localStorage.removeItem(key);
    };

    return [state, setStorage];
};
