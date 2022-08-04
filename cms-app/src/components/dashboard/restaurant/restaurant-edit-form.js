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
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { wait } from '../../../utils/wait';
import { useTranslation } from 'react-i18next';
import { restaurantApi } from '../../../api/restaurant-api';
import { useRouter } from 'next/router';

export const CustomerEditForm = props => {
  const { t } = useTranslation();
  const { customer, ...other } = props;
  const formik = useFormik({
    initialValues: {
      address1: customer.address1 || '',
      address2: customer.address2 || '',
      country: customer.country || '',
      email: customer.email || '',
      hasDiscount: customer.hasDiscount || false,
      isVerified: customer.isVerified || false,
      name: customer.name || '',
      phone: customer.phone || '',
      state: customer.state || '',
      submit: null,
    },
    validationSchema: Yup.object({
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup.string().max(255).required('Name is required'),
      phone: Yup.string().max(15),
      state: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        // await wait(3000);
        // helpers.setStatus({ success: true });
        // helpers.setSubmitting(false);
        // toast.success('Customer updated!');

        await restaurantApi.updateRestaurant(16, {
          address: 'address test 16',
          address1: 'address1 test',
          address2: 'address2 test',
          country: 'country test',
          email: 'user1@truthy.com',
          isActive: true,
          location: 'Hong Kong',
          name: 'user1',
          orders: 0,
          phone: '91234567',
          spent: 0,
          state: 'state test',
        });
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
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
              checked={formik.values.hasDiscount}
              color="primary"
              edge="start"
              name="hasDiscount"
              onChange={formik.handleChange}
              value={formik.values.hasDiscount}
            />
          </Box>
        </CardContent>
        <CardActions sx={{ flexWrap: 'wrap', m: -1 }}>
          <Button disabled={formik.isSubmitting} type="submit" sx={{ m: 1 }} variant="contained">
            {t('UPDATE')}
          </Button>
          <NextLink href="/dashboard/customers/1" passHref>
            <Button component="a" disabled={formik.isSubmitting} sx={{ m: 1, mr: 'auto' }} variant="outlined">
              {t('CANCEL')}
            </Button>
          </NextLink>
          <Button color="error" disabled={formik.isSubmitting}>
            {t('DELETE_RESTAURANT')}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

CustomerEditForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
