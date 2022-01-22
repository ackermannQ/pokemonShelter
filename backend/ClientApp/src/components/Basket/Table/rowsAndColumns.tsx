import { GridColDef } from '@mui/x-data-grid';

import DeleteButton from '../../DeleteButton';
import { RemoveItem } from '../httpRepository';
import { IBasket } from '../interfaces';

export default function buildRows(basket: IBasket | null) {
    return basket?.items?.map(item => {

        return {
            id: item.productId,
            name: item.name,
            type: item.type,
            price: (item.price / 10).toFixed(2),
            pictureUrl: item.pictureUrl,
            quantity: item.quantity,
            action: item.productId,
        }
    });
}

export function buildColumns(): GridColDef[] {

    return [{ field: 'id', headerName: 'ProductId', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 200 },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'pictureUrl', headerName: '', width: 100, renderCell: (params) => <img style={{ height: 50, backgroundSize: 'contain' }} src={params.value} alt="pokemon" /> },
    { field: 'quantity', headerName: 'How many?', width: 100 },
    { field: 'action', headerName: '', width: 100, renderCell: (params) => <DeleteButton onDelete={() => RemoveItem(params.value)} /> },
    ];
}

export function getTotal(basket: IBasket | null) {

    return basket?.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
