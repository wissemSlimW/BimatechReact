import { Grid } from '@mui/material';
import { ActionBtn } from './ActionBtn';
import { ReactElement } from 'react';

export const ActionBlock = ({ _id, actions }: { _id: string, actions: { icon: ReactElement, action: (_id: string) => void }[] }) => {
    return (<Grid container justifyContent='end'>
        {actions.map((action, i) => <ActionBtn key={i} icon={action.icon} {...{ _id }} action={action.action} />)}
    </Grid>)
}