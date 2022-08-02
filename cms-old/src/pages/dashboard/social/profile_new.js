import { useCallback, useState, useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { Avatar, Box, Button, Container, Divider, IconButton, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import { socialApi } from "../../../__fake-api__/social-api";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { SocialConnections } from "../../../components/dashboard/social/social-connections";
import { SocialTimeline } from "../../../components/dashboard/social/social-timeline";
import { useMounted } from "../../../hooks/use-mounted";
import { Chat as ChatIcon } from "../../../icons/chat";
import { DotsHorizontal as DotsHorizontalIcon } from "../../../icons/dots-horizontal";
import { UserAdd as UserAddIcon } from "../../../icons/user-add";
import { gtm } from "../../../lib/gtm";

const tabs = [
  { label: "Timeline", value: "timeline" },
  { label: "Connections", value: "connections" },
];

export const SocialProfile = () => {
  const isMounted = useMounted();
  const [currentTab, setCurrentTab] = useState("timeline");
  const [profile, setProfile] = useState(null);
  const [connectedStatus, setConnectedStatus] = useState("not_connected");

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const getProfile = useCallback(async () => {
    try {
      const data = await socialApi.getProfile();

      if (isMounted()) {
        setProfile(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getProfile();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getProfile],
  );

  const handleConnectToggle = () => {
    setConnectedStatus(prevConnectedStatus => (prevConnectedStatus === "not_connected" ? "pending" : "not_connected"));
  };

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!profile) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Social Profile | Material Kit Pro</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        profile_new
      </Box>
    </>
  );
};

SocialProfile.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default SocialProfile;
