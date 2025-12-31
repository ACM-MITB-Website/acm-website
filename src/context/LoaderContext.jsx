import React, { createContext, useState, useContext, useEffect } from 'react';

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
    // Initialize loading to true.
    // Since this Provider is inside AppRouter (or wrapping it), 
    // it will remount on every strict Page Refresh, resetting this to true.
    // It will NOT remount on client-side route changes, keeping it false after first load.
    const [loading, setLoading] = useState(true);

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};
