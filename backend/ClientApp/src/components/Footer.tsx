import Typography from '@material-ui/core/Typography/Typography';
import React from 'react'

export default function Footer() {
    const date = new Date();

    return (
        <div style={{ marginTop: '50px' }}>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Brewed with ☕ ☕ ☕ - {date.getFullYear()}
            </Typography>
        </div>
    );
}
