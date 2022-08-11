import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Button, Chip, Container, Grid, Link, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fakeCustomerApi } from '../../../../__fake-api__/customer-api';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { RestaurantEditForm } from '../../../../components/dashboard/restaurant/restaurant-edit-form';
import { AdvertisementNewForm } from '../../../../components/dashboard/advertisement/restaurant-new-form';

import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useTranslation } from 'react-i18next';
import { restaurantApi } from '../../../../api/restaurant-api';
import { useRouter } from 'next/router';

const AdvertisementNew = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const [restaurant, setRestaurant] = useState(null);
  const restaurantUuid = '5dfe251b-b458-4142-b731-b7ff7ab61224';

  const [is_loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Advertisement Edit | louislabs</title>
      </Head>

      <Box component="main" sx={{ backgroundColor: 'background.default', flexGrow: 1, py: 8 }}>
        <Box component="main" sx={{ backgroundColor: 'background.default', flexGrow: 1, py: 8 }}>
          <Container maxWidth="md">
            <Box sx={{ mb: 4 }}>
              <NextLink href="/dashboard/advertisement" passHref>
                <Link color="textPrimary" component="a" sx={{ alignItems: 'center', display: 'flex' }}>
                  <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">{t('ADVERTISEMENTS')}</Typography>
                </Link>
              </NextLink>
            </Box>

            <Box mt={3}>
              <AdvertisementNewForm advertisement={{}} />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

AdvertisementNew.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default AdvertisementNew;
