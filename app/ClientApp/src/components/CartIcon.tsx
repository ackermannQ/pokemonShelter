import React from 'react';
import FlightTakeoffTwoToneIcon from '@mui/icons-material/FlightTakeoffTwoTone';
import { Badge, IconButton } from '@mui/material';

interface CartIconProps {
    badgeContent: number | null;
}

export default function CartIcon(props: CartIconProps) {

    return (
        <IconButton href="/cart">
            <Badge badgeContent={props.badgeContent ?? null} color="primary">
                <FlightTakeoffTwoToneIcon sx={{ color: 'white' }} />
            </Badge>
        </IconButton>
    )
}
