import {createContext} from 'react';

const SessionContext = createContext();

export default SessionContext;
export const SessionProvider = SessionContext.Provider;