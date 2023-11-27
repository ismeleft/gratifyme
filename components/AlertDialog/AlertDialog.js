import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./AlertDialog.module.css";

export default function AlertDialog({ open, handleClose, handleConfirm }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={styles.dialogTitle} id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className={styles.dialogText}
            id="alert-dialog-description"
          >
            It will not be able to restore.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={styles.dialogButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className={styles.dialogButton}
            onClick={handleConfirm}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
