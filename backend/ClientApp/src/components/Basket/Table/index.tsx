import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { manageError } from '../../../api/errorManager';
import { useStoreContext } from '../../../context/StoreContext';
import { remove } from '../httpRepository';

import { IBasket } from '../interfaces';
import sad from './images/sad.gif'
import buildRows, { buildColumns, getTotal } from './rowsAndColumns';

interface TableProps {
    basket: IBasket | null;
}

export default function Table(props: TableProps) {
    const [total, setTotal] = React.useState(0);
    const { removeItem } = useStoreContext();

    const rows = buildRows(props.basket);
    const columns = buildColumns(handleRemoveItem);

    function handleRemoveItem(productId: number) {
        remove(productId).then(() => removeItem(productId, 1)).catch(manageError);
    }

    React.useEffect(() => {
        setTotal(getTotal(props.basket) ?? 0);
    }, [props.basket]);

    return (
        <div style={{ height: 350, width: '100%' }}>
            {props.basket ?
                <>
                    <DataGrid
                        rows={rows ?? []}
                        columns={columns}
                        pageSize={4}
                        rowsPerPageOptions={[4]}
                    />
                    <Typography style={{ marginTop: '2%' }} variant="h6">Total: {(total / 10).toFixed(2)} €</Typography>
                </> :
                <>
                    <Typography style={{ marginTop: '10%', marginBottom: '5%' }} variant="h6">Your don't want to adopt yet ...</Typography>
                    <img src={sad} alt="Sad" />
                </>}
        </div>
    );
}
