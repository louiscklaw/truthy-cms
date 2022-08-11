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
import { wait } from '../../../utils/wait';
import { useTranslation } from 'react-i18next';
import { restaurantApi } from '../../../api/restaurant-api';
import Router, { useRouter } from 'next/router';
import Debug from '../../../components/debug';
import slugify from 'react-slugify';
import { useEffect, useState } from 'react';
import axios from 'axios';

import _ from 'lodash';

export const RestaurantNewForm = props => {
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
      isActive: customer.isActive || false,
      name: customer.name || '',
      phone: customer.phone || '',
      state: customer.state || '',
      meny_service_types: [{ id: 3 }],
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
      slug: Yup.string().test(
        'test slug taken',
        d => `${d.path} is already taken`,
        async value => {
          let current_count = await axios.get(`/api/restaurants/check-slug/${value}`).then(res => res.data[1]);
          if (current_count > 0) return false;
          return true;
        },
      ),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        // await wait(3000);

        let temp = formik.values;
        await restaurantApi.createRestaurant(temp);

        // router.replace('/dashboard/restaurants');
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success(t('RESTAURANT_ADDED'));
        router.replace('/dashboard/restaurants');
      } catch (err) {
        console.error(err);
        toast.error(t('RESTAURANT_ADD_FAILED'));
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const [restaurant_slug, setRestaurantSlug] = useState('');
  const getRestaurantSlug = slug_input => slugify(slug_input);
  const [slug_color, setSlugColor] = useState('primary');
  const [slug_error, setSlugError] = useState(false);

  useEffect(() => {
    axios.get(`/api/restaurants/check-slug/${formik.values.slug}`).then(res => {
      console.log({ res });
      if (res.data[1] > 0) {
        // slug taken
        console.log('slug taken');
        setSlugError(true);
      } else {
        console.log('slug available');
        setSlugError(false);
      }
    });
  }, [formik.values.slug]);

  if (!formik.values) return <>preparing</>;

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title={t('NEW_RESTAURANT')} />
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
                error={Boolean(formik.touched.slug && formik.errors.slug)}
                fullWidth
                helperText={formik.touched.slug && formik.errors.slug}
                label="slug"
                name="slug"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.slug}
                // color={slug_color}
                error={slug_error}
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
            {/* <Grid item md={6} xs={12} sx={{ display: 'none' }}>
              <TextField
                error={Boolean(formik.touched.spent && formik.errors.spent)}
                fullWidth
                helperText={formik.touched.spent && formik.errors.spent}
                label="Spent"
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
                label="Orders"
                name="orders"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.orders}
                disabled
              />
            </Grid> */}
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.location && formik.errors.location)}
                fullWidth
                helperText={formik.touched.location && formik.errors.location}
                label="Location"
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
                label="Address"
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

            <Grid item md={6} xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Age</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={1}
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
        </CardContent>
        <CardActions sx={{ flexWrap: 'wrap', m: -1 }}>
          <Button disabled={formik.isSubmitting} type="submit" sx={{ m: 1 }} variant="contained">
            {t('SAVE')}
          </Button>
          <NextLink href="/dashboard/customers/1" passHref>
            <Button component="a" disabled={formik.isSubmitting} sx={{ m: 1, mr: 'auto' }} variant="outlined">
              {t('CANCEL')}
            </Button>
          </NextLink>
        </CardActions>
      </Card>
      <Debug>
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
      </Debug>
      <Debug>
        <pre>
          {JSON.stringify(
            {
              address: 'address test',
              address1: 'address1 test',
              address2: 'address2 test',
              country: 'country test',
              email: 'user1@truthy.com',
              isActive: true,
              location: 'Hong Kong',
              name: 'user1',
              phone: '91234567',
              state: 'state test',
              meny_service_types: [{ id: 3 }],
            },
            null,
            2,
          )}
        </pre>
      </Debug>
    </form>
  );
};

RestaurantNewForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
