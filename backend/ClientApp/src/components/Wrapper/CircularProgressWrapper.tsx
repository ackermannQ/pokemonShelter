import { CircularProgressProps } from '@material-ui/core';
import { CircularProgress } from '@mui/material';
import React from 'react';

interface CircularProgressWrapperProps extends CircularProgressProps {
    children: JSX.Element[] | JSX.Element;

    isLoading: boolean;
}

export default function CircularProgressWrapper(props: CircularProgressWrapperProps) {
    return <>
        {props.isLoading ?
            <CircularProgress color="inherit" /> : props.children
        }
    </>
}
