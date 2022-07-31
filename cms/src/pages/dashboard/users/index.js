import { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
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
} from "@mui/material";
import { customerApi } from "../../../__fake-api__/customer-api";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { CustomerListTable } from "../../../components/dashboard/customer/customer-list-table";
import { useMounted } from "../../../hooks/use-mounted";
import { Download as DownloadIcon } from "../../../icons/download";
import { Plus as PlusIcon } from "../../../icons/plus";
import { Search as SearchIcon } from "../../../icons/search";
import { Upload as UploadIcon } from "../../../icons/upload";
import { gtm } from "../../../lib/gtm";
import UserNewDialog from "../../../components/dashboard/users/user-new-dialog";
import { useTranslation } from "react-i18next";

const tabs = [
  { label: "All", value: "all" },
  { label: "Restaurant", value: "hasAcceptedMarketing" },
  { label: "Restaurant Oper", value: "isProspect" },
  { label: "Hotel", value: "isReturning" },
  { label: "Hotel Oper", value: "isReturning" },
];

const sortOptions = [
  { label: "Last update (newest)", value: "updatedAt|desc" },
  { label: "Last update (oldest)", value: "updatedAt|asc" },
  { label: "Total orders (highest)", value: "totalOrders|desc" },
  { label: "Total orders (lowest)", value: "totalOrders|asc" },
];

const applyFilters1 = (customers, filters) =>
  customers.filter(customer => {
    if (filters.query) {
      let queryMatched = false;
      const properties = ["email", "name"];

      properties.forEach(property => {
        if (customer[property].toLowerCase().includes(filters.query.toLowerCase())) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    if (filters.hasAcceptedMarketing && !customer.hasAcceptedMarketing) {
      return false;
    }

    if (filters.isProspect && !customer.isProspect) {
      return false;
    }

    if (filters.isReturning && !customer.isReturning) {
      return false;
    }

    return true;
  });

const applyFilters = (customers, filters) => {
  console.log({ customers, filters });
  return customers;
};

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
  sortDir === "desc" ? (a, b) => descendingComparator(a, b, sortBy) : (a, b) => -descendingComparator(a, b, sortBy);

const applySort = (customers, sort) => {
  const [sortBy, sortDir] = sort.split("|");
  const comparator = getComparator(sortDir, sortBy);

  // const stabilizedThis = customers.map((el, index) => [el, index]);
  const stabilizedThis = customers;

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
};

const applyPagination = (customers, page, rowsPerPage) =>
  customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const UserList = () => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [currentTab, setCurrentTab] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    query: "",
    hasAcceptedMarketing: undefined,
    isProspect: undefined,
    isReturning: undefined,
  });
  const { t } = useTranslation();

  const [user_list, setUserList] = useState([]);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const getCustomers = useCallback(async () => {
    console.log({ isMounted: isMounted() });
    try {
      // const data = await customerApi.getCustomers();
      // const data_temp = await fetch("/api/users").then(res => res.json());
      const data = await fetch("/api/users").then(res => res.json());

      if (isMounted()) {
        // console.log({ data });
        // setCustomers(data);
      }
    } catch (err) {
      console.error({ err, data });
    }
  }, [isMounted]);

  const getUsers = useCallback(async () => {
    try {
      if (isMounted()) {
        await fetch("/api/users")
          .then(res => res.json())
          .then(res_json => {
            if (res_json?.results) {
              setUserList(res_json.results);
            }
          });
      }
    } catch (error) {}
  }, [isMounted]);

  useEffect(
    () => {
      // getCustomers();
      getUsers();
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

    if (value !== "all") {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

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

  const [new_dialog, setNewDialog] = useState(false);

  return (
    <>
      <UserNewDialog open={new_dialog} setOpen={setNewDialog} />
      <Head>
        <title>Dashboard: User List | Material Kit Pro</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Users</Typography>
              </Grid>
              <Grid item>
                <Button startIcon={<PlusIcon fontSize="small" />} variant="contained" onClick={e => setNewDialog(true)}>
                  {t("Add")}
                </Button>
              </Grid>
            </Grid>
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
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
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
                  placeholder="Search customers"
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
            <CustomerListTable customers={user_list} />
            <pre>{JSON.stringify(user_list, null, 2)}</pre>
          </Card>
        </Container>
      </Box>
    </>
  );
};

UserList.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default UserList;
