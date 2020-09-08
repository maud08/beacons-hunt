import React, {createContext} from 'react';

const LayerContext = createContext();

export default LayerContext;
export const LayerProvider = LayerContext.Provider