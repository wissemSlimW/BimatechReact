import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export const DeleteDialog = (
    {
        title,
        handleClose,
        handleConfirm,
    }
        :
        {
            title: string,
            handleClose: () => void,
            handleConfirm: () => void,
        }) => {
    return (
        <Dialog
            open={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle >
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText >
                    Would you like to delete this element ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}