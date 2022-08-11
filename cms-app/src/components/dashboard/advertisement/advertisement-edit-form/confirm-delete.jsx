import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ConfirmDelete({ open = false, setOpen }) {
  const { restaurantUuid } = useRouter().query;
  const { t } = useTranslation();
  const router = useRouter();

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  const [is_processing, setIsProcessing] = React.useState(false);

  const handleConfirmDelete = () => {
    setIsProcessing(true);
    axios
      .delete(`/api/restaurants/16`)
      .then(res => {
        toast.success(t('RESTAURANT_DELETED'));
        router.replace('/dashboard/restaurants');
        setOpen(false);
      })
      .catch(err => {
        console.error({ err });
      });
  };

  if (!restaurantUuid) return <>{JSON.stringify(useRouter().query)} error during pop confirm delete dialog</>;

  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete restaurant'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Delete restaurant ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={is_processing} onClick={handleClose} variant="contained">
            {t('CANCEL')}
          </Button>
          <Button disabled={is_processing} onClick={handleConfirmDelete} autoFocus>
            {t('DELETE')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
