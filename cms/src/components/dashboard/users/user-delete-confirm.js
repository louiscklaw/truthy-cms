import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import { FaSkull } from "react-icons/fa";
import { useRouter } from "next/router";
import DebugPrint from "../../debug-print";

export default function UserDeleteConfirm({ open = false, setOpen }) {
  const router = useRouter();
  const { userId } = router.query;
  const { t } = useTranslation();
  const [is_loading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = e => {
    setIsLoading(true);
    fetch(`/api/users/${userId}`, { method: "DELETE" }).then(res => {
      console.log({ res });
      router.push("/dashboard/users");

      setIsLoading(false);
      setOpen(false);
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Use 阪ハウワ応92勤常勉旋72依過らつ。門むば隊就メツヘ突長山テ碁人ゆッ service?")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("Let 阪ハウワ応92勤常勉旋72依過らつ。門むば隊就メツヘ突長山テ碁人ゆッ even when no apps are running.")}
          </DialogContentText>
          <DebugPrint>cms/src/components/dashboard/users/user-delete-confirm.js</DebugPrint>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={is_loading}>
            {t("Cancel")}
          </Button>
          <LoadingButton
            loading={is_loading}
            disabled={is_loading}
            loadingPosition="start"
            startIcon={<FaSkull />}
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            {t("Delete")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
