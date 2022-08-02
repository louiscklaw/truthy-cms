import NextLink from "next/link";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { wait } from "../../../utils/wait";
import { useRouter } from "next/router";
import DebugPrint from "../../debug-print";
import UserDeleteConfirm from "./user-delete-confirm";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const UserEditForm = props => {
  const { t } = useTranslation();
  const { userId } = useRouter().query;
  const { user_info, show_delete_button, ...other } = props;
  const formik = useFormik({
    initialValues: {
      address1: user_info.address1 || "",
      address2: user_info.address2 || "",
      country: user_info.country || "",
      email: user_info.email || "",
      hasDiscount: user_info.hasDiscount || false,
      isVerified: user_info.isVerified || false,
      contact_info_public: user_info.contact_info_public,
      available_to_hire: user_info.available_to_hire,
      name: user_info.name || "",
      phone: user_info.phone || "",
      state: user_info.state || "",
      submit: null,
    },
    validationSchema: Yup.object({
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup.string().max(255).required("Name is required"),
      phone: Yup.string().max(15),
      state: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log({ values });
        delete values.username;
        delete values.email;
        delete values.submit;

        // NOTE: Make API request
        fetch(`/api/users/${userId}`, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "content-type": "application/json" },
        });

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("user updated!");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const [open_delete_confirm, setOpenDeleteConfirm] = useState(false);

  return (
    <>
      <UserDeleteConfirm open={open_delete_confirm} setOpen={setOpenDeleteConfirm} />
      <form onSubmit={formik.handleSubmit} {...other}>
        <Card>
          <CardHeader title="Edit user" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Full name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.name}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.email}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.country && formik.errors.country)}
                  fullWidth
                  helperText={formik.touched.country && formik.errors.country}
                  label="Country"
                  name="country"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.country}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.state && formik.errors.state)}
                  fullWidth
                  helperText={formik.touched.state && formik.errors.state}
                  label="State/Region"
                  name="state"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.state}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.address1 && formik.errors.address1)}
                  fullWidth
                  helperText={formik.touched.address1 && formik.errors.address1}
                  label="Address 1"
                  name="address1"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address1}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.address2 && formik.errors.address2)}
                  fullWidth
                  helperText={formik.touched.address2 && formik.errors.address2}
                  label="Address 2"
                  name="address2"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address2}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Phone number"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </Grid>
            </Grid>
            <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", mt: 3 }}>
              <div>
                <Typography gutterBottom variant="subtitle1">
                  Make Contact Info Public
                </Typography>
                <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                  Means that anyone viewing your profile will be able to see your contacts details
                </Typography>
              </div>
              <Switch
                checked={formik.values.contact_info_public}
                color="primary"
                edge="start"
                name="contact_info_public"
                onChange={formik.handleChange}
                value={formik.values.contact_info_public}
              />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography gutterBottom variant="subtitle1">
                  Available to hire
                </Typography>
                <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                  Toggling this will let your teammates know that you are available for acquiring new projects
                </Typography>
              </div>
              {JSON.stringify(formik.values.available_to_hire)}
              <Switch
                checked={formik.values.available_to_hire}
                color="primary"
                edge="start"
                name="available_to_hire"
                onChange={formik.handleChange}
                value={formik.values.available_to_hire}
              />
            </Box>
          </CardContent>
          <CardActions sx={{ flexWrap: "wrap", m: -1 }}>
            <Button disabled={formik.isSubmitting} type="submit" sx={{ m: 1 }} variant="contained">
              {t("Update")}
            </Button>
            <NextLink href={`/dashboard/users/${userId}`} passHref>
              <Button component="a" disabled={formik.isSubmitting} sx={{ m: 1, mr: "auto" }} variant="outlined">
                {t("Cancel")}
              </Button>
            </NextLink>
            {show_delete_button ? (
              <Button color="error" disabled={formik.isSubmitting} onClick={e => setOpenDeleteConfirm(true)}>
                {t("Delete user")}
              </Button>
            ) : (
              <></>
            )}
          </CardActions>
        </Card>
        <DebugPrint>cms/src/components/dashboard/users/user-edit-form.js</DebugPrint>
      </form>
    </>
  );
};

UserEditForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
