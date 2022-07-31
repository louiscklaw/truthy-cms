import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { OverviewBanner } from "../../components/dashboard/overview/overview-banner";
import { OverviewCryptoWallet } from "../../components/dashboard/overview/overview-crypto-wallet";
import { OverviewInbox } from "../../components/dashboard/overview/overview-inbox";
import { OverviewLatestTransactions } from "../../components/dashboard/overview/overview-latest-transactions";
import { OverviewPrivateWallet } from "../../components/dashboard/overview/overview-private-wallet";
import { OverviewTotalBalance } from "../../components/dashboard/overview/overview-total-balance";
import { OverviewTotalTransactions } from "../../components/dashboard/overview/overview-total-transactions";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import { Briefcase as BriefcaseIcon } from "../../icons/briefcase";
import { Download as DownloadIcon } from "../../icons/download";
import { ExternalLink as ExternalLinkIcon } from "../../icons/external-link";
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from "../../icons/information-circle-outlined";
import { Reports as ReportsIcon } from "../../icons/reports";
import { Users as UsersIcon } from "../../icons/users";
import { gtm } from "../../lib/gtm";
import { CardTest1 } from "../../components/dashboard/overview/card-test-1";
import DebugPrint from "../../components/debug-print";
import { CardTest2 } from "../../components/dashboard/overview/card-test-2";
import { CardTest3 } from "../../components/dashboard/overview/card-test-3";
import { CardTest4 } from "../../components/dashboard/overview/card-test-4";
import { AnalyticsGeneralOverview } from "../../components/dashboard/analytics/analytics-general-overview";
import { AnalyticsTrafficSources } from "../../components/dashboard/analytics/analytics-traffic-sources";
import { AnalyticsVisitsByCountry } from "../../components/dashboard/analytics/analytics-visits-by-country";
import { AnalyticsMostVisited } from "../../components/dashboard/analytics/analytics-most-visited";
import { AnalyticsSocialSources } from "../../components/dashboard/analytics/analytics-social-sources";
import { useTranslation } from "react-i18next";

const Overview = () => {
  const [displayBanner, setDisplayBanner] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem("dismiss-banner");

    if (value === "true") {
      // setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

  return (
    <>
      <Head>
        <title>Dashboard: Overview | Material Kit Pro</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">{t("Analytics")}</Typography>
              </Grid>
              <Grid item sx={{ alignItems: "center", display: "flex", m: -1 }}>
                <Button startIcon={<ReportsIcon fontSize="small" />} sx={{ m: 1 }} variant="outlined" size={"small"}>
                  {t("Reports")}
                </Button>
                <TextField defaultValue="week" label="Period" select size="small" sx={{ m: 1 }} size={"small"}>
                  <MenuItem value="week">Last week</MenuItem>
                  <MenuItem value="month">Last month</MenuItem>
                  <MenuItem value="year">Last year</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest1 />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest2 />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest3 />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest4 />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest1 />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest2 />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest3 />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest4 />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest1 />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest2 />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest3 />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <CardTest4 />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <DebugPrint>dashboard/index.js</DebugPrint>
    </>
  );
};

Overview.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Overview;
