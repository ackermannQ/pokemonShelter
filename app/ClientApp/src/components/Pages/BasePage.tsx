import { Grid, Paper, styled, Typography } from '@material-ui/core';
import React from 'react';

interface PageBaseProps {
    title: string
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasePage(props: PageBaseProps) {
    return (
        <div style={{ marginTop: '1%' }}>
            <Typography variant='h3'>{props.title}</Typography>
            <Grid container style={{ marginTop: '2%' }}>
                <Grid item xs={12}>
                    <Item>
                        Truc
                    </Item>
                </Grid>
            </Grid>
        </div>
    )
}
