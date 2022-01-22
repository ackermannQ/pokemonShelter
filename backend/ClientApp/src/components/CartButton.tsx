import FlightTakeoffTwoToneIcon from '@mui/icons-material/FlightTakeoffTwoTone';
import { Badge, IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface CartIconProps {
    badgeContent: number | undefined;
}

export default function CartButton(props: CartIconProps) {

    return (
        <IconButton>
            <Link to='/basket'>
                <Badge badgeContent={props.badgeContent ?? undefined} color="secondary">
                    <FlightTakeoffTwoToneIcon sx={{ color: 'white' }} />
                </Badge>
            </Link>
        </IconButton>
    );
}
