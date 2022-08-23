import { SxProps } from '@mui/material';

export function makeStyles<T extends Record<string, SxProps>>(styles: T): T {
    return styles;
}
