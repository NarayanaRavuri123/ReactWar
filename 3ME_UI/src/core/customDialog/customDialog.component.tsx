import { Dialog, DialogContent, DialogTitle } from "@mui/material"

type Props = {
    handleClose: any,
    openConfirmation: boolean,
    title?: string,
    closeIcon: any,
    children: any,
    dailogPaper?: any,
    dailogClass?: any,
    comfirmationTitle?: any,
    dialogCloseIcon?: any,
    dialogTitleRoot?: any,
    dialogTitle?: any,
    dialogContentRoot?: any,
    dialogContent?: any
}

export const CustomDialog = ({ handleClose, openConfirmation, title, closeIcon, children, dailogClass, dailogPaper, comfirmationTitle, dialogCloseIcon, dialogTitleRoot, dialogTitle, dialogContentRoot, dialogContent }: Props) => {
    return (
        <Dialog
            classes={{ paper: dailogPaper }}
            className={dailogClass}
            open={openConfirmation}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <div>
                <DialogTitle classes={{ root: dialogTitleRoot }} className={dialogTitle}>
                    <div className={comfirmationTitle}>{title}</div>
                    <img className={dialogCloseIcon} src={closeIcon} alt={closeIcon} onClick={handleClose} />
                </DialogTitle>
                <DialogContent classes={{ root: dialogContentRoot }} className={dialogContent}>
                    {children}
                </DialogContent>
            </div>
        </Dialog >
    )
}