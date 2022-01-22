import { GridColDef } from '@mui/x-data-grid';

import DeleteButton from '../../DeleteButton';
import { IBasket } from '../interfaces';

/**
 * Build the rows for the datagrid displaying the basket
 * @param {IBasket | null} basket The basket to get the different data to display is passed in argument
 */
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

/**
 * Build the columns for the datagrid displaying the basket
 * @param {(productId: number) => void} handleRemoveItem Callback to remove the item using the api and also using the context
 */
export function buildColumns(handleRemoveItem: (productId: number) => void): GridColDef[] {

    return [{ field: 'id', headerName: 'ProductId', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 200 },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'pictureUrl', headerName: '', width: 100, renderCell: (params) => <img style={{ height: 50, backgroundSize: 'contain' }} src={params.value} alt="pokemon" /> },
    { field: 'quantity', headerName: 'How many?', width: 100 },
    {
        field: 'action', headerName: '', width: 100, renderCell: (params) => <DeleteButton onDelete={() => handleRemoveItem(params.value)} />
    },
    ];
}

/**
 * Calculate the total of the basket using the basket items' price
 * @param {IBasket | null} basket
 */
export function getTotal(basket: IBasket | null) {

    return basket?.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
