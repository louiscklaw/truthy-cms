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

export const AdvertisementNewForm = props => {
  const { t } = useTranslation();
  const router = useRouter();
  const { restaurantId, restaurantUuid } = router.query;
  const { advertisement, ...other } = props;
  const formik = useFormik({
    initialValues: {
      description: advertisement.description || '',
      name: advertisement.name || '',
      remarks: advertisement.remarks || '',
      isActive: advertisement.isActive || false,
    },
    validationSchema: Yup.object({
      description: Yup.string().max(255),
      name: Yup.string().max(255),
      remarks: Yup.string().max(255),
      isActive: Yup.boolean(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        // await wait(3000);

        let temp = formik.values;
        await advertisementApi.createAdvertisement(temp);

        // router.replace('/dashboard/restaurants');
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success(t('ADVERTISEMENT_ADDED'));
        router.replace('/dashboard/advertisements');
      } catch (err) {
        console.error(err);
        toast.error(t('ADVERTISEMENT_ADD_FAILED'));
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
    axios.get(`/api/advertisements/check-slug/${formik.values.slug}`).then(res => {
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
        <CardHeader title={t('NEW_ADVERTISEMENT')} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label={t('ADVERTISEMENT_NAME')}
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
                label={t('ADVERTISEMENT_SLUG')}
                name="slug"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.slug}
                // color={slug_color}
                error={slug_error}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(formik.touched.description && formik.errors.description)}
                fullWidth
                helperText={formik.touched.description && formik.errors.description}
                label={t('DESCRIPTION')}
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.description}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(formik.touched.remarks && formik.errors.remarks)}
                fullWidth
                helperText={formik.touched.remarks && formik.errors.remarks}
                label={t('REMARKS')}
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.remarks}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
                <div>
                  <Typography gutterBottom variant="subtitle1">
                    advertisement is active ?
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
        </CardContent>
        <Divider sx={{ my: 3 }} />
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

AdvertisementNewForm.propTypes = {
  advertisement: PropTypes.object.isRequired,
};
