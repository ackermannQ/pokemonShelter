import { BlockRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface DeleteIconProps {
    onDelete: () => void;
}

export default function DeleteButton(props: DeleteIconProps) {

    return (
        <IconButton onClick={props.onDelete}>
            <BlockRounded sx={{ color: '#fedfedg' }} />
        </IconButton>
    );
}
