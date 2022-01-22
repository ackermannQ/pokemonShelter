import React, { createContext, PropsWithChildren, useContext } from 'react';

import { IBasket } from '../components/Basket/interfaces';

interface StoreContextValueProps {
    basket: IBasket | null;
    setBasket: (basket: IBasket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValueProps | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) throw Error('Weird, no context we are not inside the provider');

    return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
    const [basket, setBasket] = React.useState<IBasket | null>(null);

    function removeItem(productId: number, quantity: number) {
        if (!basket) return;

        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);

        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;

            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket(prevState => {
                return { ...prevState!, items }
            });
        }

        console.log('items', items);
        console.log('basket', basket);

    }

    return <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
        {children}
    </StoreContext.Provider>
}
