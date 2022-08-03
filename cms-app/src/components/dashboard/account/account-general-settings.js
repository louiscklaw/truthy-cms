import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/use-auth";
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";
import DebugPrint from "../../../components/debug-print";
import { useFormik } from "formik";

import { toast } from "react-hot-toast";

export const AccountGeneralSettings = (props) => {
  // To get the user from the authContext, you can use
  const { user } = useAuth();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      contact_info_public: user.contact_info_public,
    },
    onSubmit: async (values, helpers) => {
      console.log(values);
      toast.success(t("account settings changed"));
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <Box sx={{ mt: 4 }} {...props}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">{t("Basic details")}</Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box sx={{ alignItems: "center", display: "flex" }}>
                  <Avatar
                    src={user.avatar}
                    sx={{ height: 64, mr: 2, width: 64 }}
                  >
                    <UserCircleIcon fontSize="small" />
                  </Avatar>
                  <Button>{t("Change")}</Button>
                </Box>
                <Box sx={{ display: "flex", mt: 3, alignItems: "center" }}>
                  <TextField
                    defaultValue={user.name}
                    label={t("Full Name")}
                    size="small"
                    sx={{ flexGrow: 1, mr: 3 }}
                  />
                  <Button>{t("Save")}</Button>
                </Box>
                <Box sx={{ display: "flex", mt: 3, alignItems: "center" }}>
                  <TextField
                    defaultValue={user?.email}
                    disabled
                    label={t("Email Address")}
                    required
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />
                  <Button>Edit</Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Public profile</Typography>
              </Grid>
              <Grid item md={8} sm={12} xs={12}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <div>
                    <Typography variant="subtitle1">
                      Make Contact Info Public
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{ mt: 1 }}
                      variant="body2"
                    >
                      Means that anyone viewing your profile will be able to see
                      your contacts details.
                    </Typography>
                  </div>
                  <Switch
                    name="contact_info_public"
                    defaultChecked={formik.values.contact_info_public}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.handleSubmit();
                    }}
                  />
                </Box>
                <Divider />
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <div>
                    <Typography variant="subtitle1">
                      Available to hire
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{ mt: 1 }}
                      variant="body2"
                    >
                      Toggling this will let your teammates know that you are
                      available for acquiring new projects.
                    </Typography>
                  </div>
                  <Switch defaultChecked />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Delete Account</Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Typography sx={{ mb: 3 }} variant="subtitle1">
                  Delete your account and all of your source data. This is
                  irreversible.
                </Typography>
                <Button color="error" variant="outlined">
                  Delete account
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <DebugPrint>{(user, formik.values)}</DebugPrint>
      </Box>
    </form>
  );
};
