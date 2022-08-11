import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Button, Chip, Container, Grid, Link, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fakeCustomerApi } from '../../../../__fake-api__/customer-api';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { RestaurantEditForm } from '../../../../components/dashboard/restaurant/restaurant-edit-form';
import { RestaurantNewForm } from '../../../../components/dashboard/restaurant/restaurant-new-form';
import { RestaurantViewForm } from '../../../../components/dashboard/restaurant/restaurant-view-form';

import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useTranslation } from 'react-i18next';
import { restaurantApi } from '../../../../api/restaurant-api';
import { useRouter } from 'next/router';
import Debug from '../../../../components/debug';

const RestaurantNew = () => {
  const { t } = useTranslation();
  const { restaurantUuid } = useRouter().query;

  return (
    <>
      <Head>
        <title>Dashboard: Customer Edit | louislabs</title>
      </Head>

      <Box component="main" sx={{ backgroundColor: 'background.default', flexGrow: 1, py: 8 }}>
        <Box component="main" sx={{ backgroundColor: 'background.default', flexGrow: 1, py: 8 }}>
          <Container maxWidth="md">
            <Box sx={{ mb: 4 }}>
              <NextLink href="/dashboard/restaurants" passHref>
                <Link color="textPrimary" component="a" sx={{ alignItems: 'center', display: 'flex' }}>
                  <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">{t('RESTAURANTS')}</Typography>
                </Link>
              </NextLink>
            </Box>

            <Box mt={3}>
              <RestaurantViewForm customer={{}} />
            </Box>
          </Container>
        </Box>
      </Box>

      <Debug>
        <pre>{JSON.stringify(restaurantUuid, null, 2)}</pre>
      </Debug>
    </>
  );
};

RestaurantNew.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default RestaurantNew;
