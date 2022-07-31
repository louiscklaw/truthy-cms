import { useState, useCallback, useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { Avatar, Box, Chip, Container, getCheckboxUtilityClass, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { customerApi } from "../../../../__fake-api__/customer-api";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { UserEditForm } from "../../../../components/dashboard/users/user-edit-form";
import { useMounted } from "../../../../hooks/use-mounted";
import { gtm } from "../../../../lib/gtm";
import { getInitials } from "../../../../utils/get-initials";
import { useRouter } from "next/router";
import DebugPrint from "../../../../components/debug-print";

const UserEdit = () => {
  const { userId } = useRouter().query;
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);
  const [user_info, setUserInfo] = useState();
  const [is_loading, setIsLoading] = useState(true);
  const getUserInfo = user_id => fetch(`/api/users/${user_id}`).then(res => res.json());

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      if (isMounted()) {
        getUserInfo(userId)
          .then(res => {
            setUserInfo(res);
            setIsLoading(false);
          })
          .catch(err => console.error(err));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (is_loading) return <>loading</>;

  return (
    <>
      <Head>
        <title>Dashboard: Customer Edit | Material Kit Pro</title>
      </Head>
      <Box component="main" sx={{ backgroundColor: "background.default", flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/dashboard/users" passHref>
              <Link color="textPrimary" component="a" sx={{ alignItems: "center", display: "flex" }}>
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Users</Typography>
              </Link>
            </NextLink>
          </Box>
          <Box sx={{ alignItems: "center", display: "flex", overflow: "hidden" }}>
            <Avatar src={user_info.avatar} sx={{ height: 64, mr: 2, width: 64 }}>
              {getInitials(user_info.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {user_info.email}
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography variant="subtitle2">user_id:</Typography>
                <Chip label={user_info.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <UserEditForm user_info={user_info} show_delete_button={true} />
          </Box>
          <pre>{JSON.stringify({ userId, user_info }, null, 2)}</pre>
        </Container>
        <DebugPrint>cms/src/pages/dashboard/users/[userId]/edit.js</DebugPrint>
      </Box>
    </>
  );
};

UserEdit.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default UserEdit;
