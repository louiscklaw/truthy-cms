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
import AdvertisementNotFound from './AdvertisementNotFound';

const AdvertisementEdit = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const [advertisement, setAdvertisement] = useState(null);
  const [is_loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { advertisementUuid } = router.query;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      // const data = await fakeCustomerApi.getCustomer();
      const { data } = await advertisementApi.getAdvertisementByUuid(advertisementUuid);

      if (isMounted()) {
        setIsLoading(false);
        setAdvertisement(data);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getCustomer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (error) {
    return (
      <>
        <pre>
          {t('some error occured')} {JSON.stringify(error, null, 2)}
        </pre>
      </>
    );
  }

  if (is_loading) return <>is loading</>;

  if (true) return <AdvertisementNotFound />;

  return (
    <>
      <Head>
        <title>Dashboard: Advertisement Edit | Louislabs</title>
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
            <Grid container sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
              <Grid item xs={12} lg={6} sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
                <Avatar src={'advertisement.avatar'} sx={{ height: 64, mr: 2, width: 64 }}>
                  {getInitials(advertisement.name)}
                </Avatar>
                <div>
                  <Typography noWrap variant="h4">
                    {advertisement.name}
                  </Typography>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Typography variant="subtitle2">restaurant_id:</Typography>
                    <Chip label={advertisement.uuid} size="small" sx={{ ml: 1 }} />
                  </Box>
                </div>
              </Grid>
              <Grid item xs={12} lg={6} sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
                <Grid item xs={12} lg={3} container sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Box>
                    <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                      Favourite
                    </Typography>
                    <Typography variant="h2">{advertisement.orders}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={3} container sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Box>
                    <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                      Bookmark
                    </Typography>
                    <Typography variant="h2">{advertisement.spent}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={3} container sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Box>
                    <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                      Orders
                    </Typography>
                    <Typography variant="h2">{advertisement.orders}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={3} container sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Box>
                    <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                      Spent
                    </Typography>
                    <Typography variant="h2">{advertisement.spent}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden', display: 'none' }}>
              <Avatar src={'advertisement.avatar'} sx={{ height: 64, mr: 2, width: 64 }}>
                {getInitials(advertisement.name)}
              </Avatar>
              <div>
                <Typography noWrap variant="h4">
                  {advertisement.name}
                </Typography>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Typography variant="subtitle2">restaurant_id:</Typography>
                  <Chip label={advertisement.uuid} size="small" sx={{ ml: 1 }} />
                </Box>
              </div>
            </Box>
            <Box mt={3}>
              <RestaurantEditForm customer={advertisement} />
            </Box>
          </Container>
        </Box>{' '}
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/dashboard/advertisements" passHref>
              <Link color="textPrimary" component="a" sx={{ alignItems: 'center', display: 'flex' }}>
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{t('ADVERTISEMENT')}</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
            <Grid item xs={12} lg={6} sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
              <Avatar src={'advertisement.avatar'} sx={{ height: 64, mr: 2, width: 64 }}>
                {getInitials(advertisement.name)}
              </Avatar>
              <div>
                <Typography noWrap variant="h4">
                  {advertisement.name}
                </Typography>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Typography variant="subtitle2">restaurant_id:</Typography>
                  <Chip label={advertisement.uuid} size="small" sx={{ ml: 1 }} />
                </Box>
              </div>
            </Grid>
            <Grid item xs={12} lg={6} sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
              <Grid item xs={12} lg={3} container sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                <Box>
                  <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                    Favourite
                  </Typography>
                  <Typography variant="h2">{advertisement.orders}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={3} container sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                <Box>
                  <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                    Bookmark
                  </Typography>
                  <Typography variant="h2">{advertisement.spent}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={3} container sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                <Box>
                  <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                    Orders
                  </Typography>
                  <Typography variant="h2">{advertisement.orders}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={3} container sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                <Box>
                  <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                    Spent
                  </Typography>
                  <Typography variant="h2">{advertisement.spent}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden', display: 'none' }}>
            <Avatar src={'advertisement.avatar'} sx={{ height: 64, mr: 2, width: 64 }}>
              {getInitials(advertisement.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {advertisement.name}
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Typography variant="subtitle2">advertisement_id:</Typography>
                <Chip label={advertisement.uuid} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <RestaurantEditForm customer={advertisement} />
          </Box>
        </Container>
      </Box>
      <Debug>{JSON.stringify({ advertisementUuid, advertisement }, null, 2)}</Debug>
    </>
  );
};

AdvertisementEdit.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default AdvertisementEdit;
