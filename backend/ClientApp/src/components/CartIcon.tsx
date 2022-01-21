import FlightTakeoffTwoToneIcon from '@mui/icons-material/FlightTakeoffTwoTone';
import { Badge, IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface CartIconProps {
    badgeContent: number | null;
}

export default function CartIcon(props: CartIconProps) {

    return (
        <IconButton>
            <Link to='/basket'>
                <Badge badgeContent={props.badgeContent ?? null} color="primary">
                    <FlightTakeoffTwoToneIcon sx={{ color: 'white' }} />
                </Badge>
            </Link>
        </IconButton>
    );
}
