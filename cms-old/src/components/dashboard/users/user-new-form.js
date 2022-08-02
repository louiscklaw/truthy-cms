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

export const UserNewForm = props => {
  const { t } = useTranslation();
  const router = useRouter();
  const { userId } = router.query;
  const { user_info, setOpen, ...other } = props;
  const formik = useFormik({
    initialValues: {
      address1: "",
      address2: "",
      country: "",
      email: "",
      hasDiscount: false,
      isVerified: false,
      contact_info_public: true,
      available_to_hire: true,
      name: "",
      phone: "",
      state: "",
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

  return (
    <>
      <form onSubmit={formik.handleSubmit} {...other}>
        <Card elevation={0}>
          <CardHeader title={t("Add user")} />
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
          </CardContent>
          <CardActions sx={{ flexWrap: "wrap", m: -1 }}>
            <Button disabled={formik.isSubmitting} type="submit" sx={{ m: 1 }} variant="contained">
              {t("Save")}
            </Button>
            <Button
              component="a"
              disabled={formik.isSubmitting}
              sx={{ m: 1, mr: "auto" }}
              variant="outlined"
              onClick={e => setOpen(false)}
            >
              {t("Cancel")}
            </Button>
          </CardActions>
        </Card>
        <DebugPrint>user-new-form.js</DebugPrint>
      </form>
    </>
  );
};

UserNewForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
