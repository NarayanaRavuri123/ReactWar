// Mui imports
import Button from '@mui/material/Button';
import { MouseEventHandler } from 'react';

interface ButtonProps {
    title: String,
    onClick: MouseEventHandler<HTMLButtonElement>
}
const PrimaryButton = (props: ButtonProps) => {
    const { title, onClick } = props;
    return (
        <Button
            variant='contained'
            sx={{
                textTransform: 'none', width: '200px',
                minHeight: '40px',
                background: '#0049BD',
                borderRadius: '2px'
            }}
            onClick={onClick}
            disableRipple
            disableFocusRipple
            disableTouchRipple
        >
            {title}
        </Button>
    )
}

export default PrimaryButton;