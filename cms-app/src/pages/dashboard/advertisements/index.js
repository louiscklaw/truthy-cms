import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';

import { advertisementApi } from '../../../api/advertisement-api';

import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { AdvertisementListTable } from '../../../components/dashboard/advertisement/advertisement-list-table';

import { useMounted } from '../../../hooks/use-mounted';
import { Download as DownloadIcon } from '../../../icons/download';
import { Plus as PlusIcon } from '../../../icons/plus';
import { Search as SearchIcon } from '../../../icons/search';
import { Upload as UploadIcon } from '../../../icons/upload';
import { gtm } from '../../../lib/gtm';
import Debug from '../../../components/debug';

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Accepts Marketing', value: 'hasAcceptedMarketing' },
  { label: 'Not Active', value: 'isProspect' },
  { label: 'Active', value: 'isReturning' },
];

const sortOptions = [
  { label: 'Last update (newest)', value: 'updatedAt|desc' },
  { label: 'Last update (oldest)', value: 'updatedAt|asc' },
  { label: 'Total orders (highest)', value: 'totalOrders|desc' },
  { label: 'Total orders (lowest)', value: 'totalOrders|asc' },
];

const applyFilters = (advertisements, filters) =>
  advertisements.filter(advertisement => {
    if (filters.query) {
      let queryMatched = false;
      const properties = ['email', 'name'];

      properties.forEach(property => {
        if (advertisement[property].toLowerCase().includes(filters.query.toLowerCase())) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    if (filters.hasAcceptedMarketing && !advertisement.hasAcceptedMarketing) {
      return false;
    }

    if (filters.isProspect && !advertisement.isProspect) {
      return false;
    }

    if (filters.isReturning && !advertisement.isReturning) {
      return false;
    }

    return true;
  });

const descendingComparator = (a, b, sortBy) => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

  if (b[sortBy] < a[sortBy]) {
    return -1;
  }

  if (b[sortBy] > a[sortBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (sortDir, sortBy) =>
  sortDir === 'desc' ? (a, b) => descendingComparator(a, b, sortBy) : (a, b) => -descendingComparator(a, b, sortBy);

const applySort = (customers, sort) => {
  const [sortBy, sortDir] = sort.split('|');
  const comparator = getComparator(sortDir, sortBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
};

const applyPagination = (advertisements, page, rowsPerPage) =>
  advertisements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const AdvertisementList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const isMounted = useMounted();
  const queryRef = useRef(null);
  const [advertisements, setAdvertisements] = useState([]);
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    query: '',
    hasAcceptedMarketing: undefined,
    isProspect: undefined,
    isReturning: undefined,
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getAdvertisements = useCallback(async () => {
    try {
      // const data = await customerApi.getCustomers();
      const { data } = await advertisementApi.getAdvertisements();
      console.log({ data });

      if (isMounted()) {
        setAdvertisements(temp);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getAdvertisements();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const [table_updating, setTableUpdating] = useState(false);

  const handleQueryChange = event => {
    event.preventDefault();

    setFilters(prevState => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  };

  const handleSortChange = event => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredAdvertisements = applyFilters(advertisements, filters);
  const sortedAdvertisements = applySort(filteredAdvertisements, sort);
  const paginatedAdvertisements = applyPagination(sortedAdvertisements, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>Dashboard: Advertisements List | Louislabs </title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">{t('ADVERTISEMENTS')}</Typography>
              </Grid>
              <Debug>
                <Grid item>
                  <Typography variant="caption">{`${t('total')}: ${advertisements.length}`}</Typography>
                </Grid>
              </Debug>
              <Grid item>
                <LoadingButton
                  onClick={e => router.push('/dashboard/advertisements/new')}
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  {t('ADD')}
                </LoadingButton>
              </Grid>
            </Grid>
            <Box sx={{ m: -1, mt: 3, display: 'none' }}>
              <Button startIcon={<UploadIcon fontSize="small" />} sx={{ m: 1 }}>
                Import
              </Button>
              <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ m: 1 }}>
                Export
              </Button>
            </Box>
          </Box>

          <Card>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ px: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map(tab => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
            <Divider />
            <Box sx={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', m: -1.5, p: 3 }}>
              <Box component="form" onSubmit={handleQueryChange} sx={{ flexGrow: 1, m: 1.5 }}>
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder={t('SEARCH_RESTAURANTS')}
                />
              </Box>
              <TextField
                label="Sort By"
                name="sort"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>
            <AdvertisementListTable
              advertisements={paginatedAdvertisements}
              advertisementsCount={filteredAdvertisements.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

AdvertisementList.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default AdvertisementList;
