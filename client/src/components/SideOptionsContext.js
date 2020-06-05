import { createContext } from 'react';

const SideOptionsContext = createContext({
    sideOptions: {},
    setSideOptions: () => {}
});

export default SideOptionsContext;