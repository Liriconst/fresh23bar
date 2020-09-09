import React from "react";
import { useMediaQuery } from 'react-responsive';

export const Phone = ({ children }: {children : any}) => {
    const isPhone = useMediaQuery({ maxWidth: 450 })
    return isPhone ? children : null
};

export const Tablet = ({ children }: {children : any}) => {
    const isTablet = useMediaQuery({ minWidth: 451, maxWidth: 800 })
    return isTablet ? children : null
};

export const Laptop = ({ children }: {children : any}) => {
    const isLaptop = useMediaQuery({ minWidth: 801, maxWidth: 1279 })
    return isLaptop ? children : null
};

export const Desktop = ({ children }: {children : any}) => {
    const isDesktop = useMediaQuery({ minWidth: 1280 })
    return isDesktop ? children : null
};