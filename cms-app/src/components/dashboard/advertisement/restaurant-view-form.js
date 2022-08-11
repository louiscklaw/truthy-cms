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
  IconButton,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { wait } from '../../../utils/wait';
import { useTranslation } from 'react-i18next';
import { restaurantApi } from '../../../api/restaurant-api';
import Router, { useRouter } from 'next/router';

import slugify from '@sindresorhus/slugify';
import Debug from '../../debug';
import { useEffect, useState } from 'react';
import QrCodeIcon from '@mui/icons-material/QrCode';
import axios from 'axios';

export const RestaurantViewForm = props => {
  const { t } = useTranslation();
  const router = useRouter();
  const { restaurantId, restaurantUuid } = router.query;
  const { customer, ...other } = props;

  const [restaurant_info, setRestaurantInfo] = useState(null);

  const handleGetQrCode = () => {
    console.log('handleGetQrCode');
  };

  useEffect(() => {
    axios
      .get(`/api/restaurants/uid/a64490a8-ae0c-40f5-8794-df1ab67fa74d`)
      .then(res => {
        console.log(res);
        setRestaurantInfo(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (!restaurant_info) return <>loading</>;

  return (
    <>
      <Card>
        <CardHeader title={t('VIEW_RESTAURANT')} />
        <IconButton color="inherit" onClick={handleGetQrCode}>
          <QrCodeIcon fontSize="small" />
        </IconButton>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.createdAt}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.createdAt}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.updatedAt}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.uuid}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.email}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.country}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.state}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.address}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.address1}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.address2}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.phone}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.location}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.slug}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.favorite}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.bookmark}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.orders}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.spent}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={t('RESTAURANT_NAME')}
                name="name"
                required
                value={restaurant_info.isActive}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Debug>{JSON.stringify({ restaurantUuid, restaurant_info }, null, 2)}</Debug>
    </>
  );
};

RestaurantViewForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
