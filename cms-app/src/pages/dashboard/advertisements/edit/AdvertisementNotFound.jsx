import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Button, Chip, Container, Grid, Link, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fakeCustomerApi } from '../../../../__fake-api__/customer-api';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { RestaurantEditForm } from '../../../../components/dashboard/restaurant/restaurant-edit-form';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useTranslation } from 'react-i18next';
import { restaurantApi } from '../../../../api/restaurant-api';
import { useRouter } from 'next/router';
import Debug from '../../../../components/debug';
import { advertisementApi } from '../../../../api/advertisement-api';
import Image from 'next/image';
import NotFoundSvg from './status-notfound.svg';

const AdvertisementNotFound = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const handleBack = () => {
    router.push('/dashboard');
  };
  return (
    <>
      <Stack direction="column" sx={{ height: '100%' }} justifyContent="center" alignItems="center" spacing={4}>
        <Box>
          <Image alt="Vercel logo" src="/cms/static/status-notfound.svg" width={100} height={100} />
        </Box>
        <Box>{t('THE_WANTED_RESOURCES_NOT_FOUND')}</Box>
        <Box>
          <Button onClick={handleBack}>{t('BACK_TO_DASHBOARD')}</Button>
        </Box>
      </Stack>
    </>
  );
};
AdvertisementNotFound.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default AdvertisementNotFound;
