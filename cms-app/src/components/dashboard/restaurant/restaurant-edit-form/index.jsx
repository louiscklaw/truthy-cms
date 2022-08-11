import _ from 'lodash';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { wait } from '../../../../utils/wait';
import { useTranslation } from 'react-i18next';
import { restaurantApi } from '../../../../api/restaurant-api';
import Router, { useRouter } from 'next/router';
import Debug from '../../../../components/debug';

import slugify from '@sindresorhus/slugify';

import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDelete from './confirm-delete';
import { useState } from 'react';
import { FaSave, FaBackspace } from 'react-icons/fa';

export const RestaurantEditForm = props => {
  const { t } = useTranslation();
  const router = useRouter();
  const { restaurantId, restaurantUuid } = router.query;
  const { customer, ...other } = props;
  const formik = useFormik({
    initialValues: {
      address: customer.address || '',
      address1: customer.address1 || '',
      address2: customer.address2 || '',
      country: customer.country || '',
      email: customer.email || '',
      location: customer.location || '',
      orders: customer.orders || 0,
      spent: customer.spent || 0,
      isActive: customer.isActive || false,

      name: customer.name || '',
      phone: customer.phone || '',
      state: customer.state || '',
      meny_service_types: [{ id: 1 }],

      ...customer,
    },
    validationSchema: Yup.object({
      address: Yup.string().max(255),
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      location: Yup.string().max(255),
      isActive: Yup.bool(),
      name: Yup.string().max(255).required('Name is required'),
      phone: Yup.string().max(15),
      state: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        // await wait(3000);

        delete values.orders;
        delete values.spent;
        delete values.uuid;
        delete values.slug;
        delete values.favorite;
        delete values.bookmark;

        console.log({ formik_values: values });
        if (restaurantUuid) {
          console.log('updateRestaurantByUuid');
          await restaurantApi.updateRestaurantByUuid(restaurantUuid, values);
        } else {
          console.log('updateRestaurantById');

          await restaurantApi.updateRestaurant(restaurantId, values);
        }
        router.replace('/dashboard/restaurants');
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Customer updated!');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const [open_delete_dialog, setOpenDeleteDialog] = useState(false);

  if (!formik.values.meny_service_types) return <>loading</>;

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <ConfirmDelete open={open_delete_dialog} setOpen={setOpenDeleteDialog} />
      <Card>
        <CardHeader title={t('EDIT_RESTAURANT')} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label={t('RESTAURANT_NAME')}
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
                label={t('RESTAURANT_EMAIL')}
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
                label={t('COUNTRY')}
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
                label={t('STATE/Region')}
                name="state"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ display: 'none' }}>
              <TextField
                error={Boolean(formik.touched.spent && formik.errors.spent)}
                fullWidth
                helperText={formik.touched.spent && formik.errors.spent}
                label={t('SPENT')}
                name="spent"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.spent}
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12} sx={{ display: 'none' }}>
              <TextField
                error={Boolean(formik.touched.orders && formik.errors.orders)}
                fullWidth
                helperText={formik.touched.orders && formik.errors.orders}
                label={t('ORDERS')}
                name="orders"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.orders}
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.location && formik.errors.location)}
                fullWidth
                helperText={formik.touched.location && formik.errors.location}
                label={t('LOCATION')}
                name="location"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.location}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                label={t('ADDRESS')}
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.address1 && formik.errors.address1)}
                fullWidth
                helperText={formik.touched.address1 && formik.errors.address1}
                label={t('ADDRESS1')}
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
                label={t('ADDRESS2')}
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
                label={t('PHONE_NUMBER')}
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.slug && formik.errors.slug)}
                fullWidth
                helperText={formik.touched.slug && formik.errors.slug}
                label={t('SLUG')}
                name="slug"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={slugify(formik.values.name)}
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.url_shortcut && formik.errors.url_shortcut)}
                fullWidth
                helperText={formik.touched.url_shortcut && formik.errors.url_shortcut}
                label={t('RESTAURANT_URL_SHORTCUT')}
                name="url_shortcut"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={`http://${slugify(formik.values.name)}.iamon99.com`}
                disabled
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Age</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={formik.values.meny_service_types[0].id}
                  label="Age"
                  onChange={e => formik.setFieldValue('meny_service_types[0].id', e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Meny</MenuItem>
                  <MenuItem value={2}>Meny light</MenuItem>
                  <MenuItem value={3}>Meny takeaway</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Typography gutterBottom variant="subtitle1">
                restaurant is active ?
              </Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Toggle restaurant to show on main screen
              </Typography>
            </div>
            <Switch
              checked={formik.values.isActive}
              color="primary"
              edge="start"
              name="isActive"
              onChange={formik.handleChange}
              value={formik.values.isActive}
            />
          </Box>

          <Debug>
            <pre>{JSON.stringify({ customer, values: formik.values }, null, 2)}</pre>
          </Debug>
        </CardContent>
        <CardActions sx={{ flexWrap: 'wrap', m: -1 }}>
          <Button disabled={formik.isSubmitting} type="submit" sx={{ m: 1 }} variant="contained" startIcon={<FaSave />}>
            {t('UPDATE')}
          </Button>
          <NextLink href="/dashboard/restaurants" passHref>
            <Button
              component="a"
              disabled={formik.isSubmitting}
              sx={{ m: 1, mr: 'auto' }}
              variant="outlined"
              startIcon={<FaBackspace />}
            >
              {t('CANCEL')}
            </Button>
          </NextLink>
          <Button
            onClick={e => setOpenDeleteDialog(true)}
            color="error"
            disabled={formik.isSubmitting}
            startIcon={<DeleteIcon />}
          >
            {t('DELETE_RESTAURANT')}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

RestaurantEditForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
