import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as React from 'react';

import { IBasket } from './interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'firstName', headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    }
];

interface TableProps {
    basket: IBasket | null;
}

export default function Table(props: TableProps) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            {props.basket ?
                <DataGrid
                    rows={props.basket?.items?.map(item => {
                        return { id: item.productId, firstName: item.name }
                    }) ?? []}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                /> : <Typography style={{ marginTop: '10%', marginBottom: '5%' }} variant="h6">Your don't want to adopt yet ...</Typography>}
        </div>
    );
}
