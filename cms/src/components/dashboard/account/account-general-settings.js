import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import { UserCircle as UserCircleIcon } from "../../../icons/user-circle";

export const AccountGeneralSettings = props => {
  const { user } = useAuth();
  const [is_loading, setIsLoading] = useState(false);
  const [user_name, setUserName] = useState(user?.name);

  async function saveFullname(e) {
    setIsLoading(true);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: user_name }),
    };

    await fetch("/api/auth/profile", requestOptions)
      .then(res => res.json())
      .then(() => setIsLoading(false));
  }

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Basic details</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Box sx={{ alignItems: "center", display: "flex" }}>
                <Avatar src={user.avatar} sx={{ height: 64, mr: 2, width: 64 }}>
                  <UserCircleIcon fontSize="small" />
                </Avatar>
                <Button>Change</Button>
              </Box>
              <Box sx={{ display: "flex", mt: 3, alignItems: "center" }}>
                <TextField
                  defaultValue={user_name}
                  label="Full Name"
                  size="small"
                  sx={{ flexGrow: 1, mr: 3 }}
                  onChange={e => setUserName(e.target.value)}
                />
                <LoadingButton loading={is_loading} onClick={e => saveFullname(e)}>
                  Save
                </LoadingButton>
              </Box>
              <Box sx={{ display: "flex", mt: 3, alignItems: "center" }}>
                <TextField
                  defaultValue="dummy.account@gmail.com"
                  disabled
                  label="Email Address"
                  required
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    "& .MuiOutlinedInput-notchedOutline": { borderStyle: "dashed" },
                  }}
                />
                <Button>Edit</Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Public profile</Typography>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", mb: 3 }}>
                <div>
                  <Typography variant="subtitle1">Make Contact Info Public</Typography>
                  <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
                    Means that anyone viewing your profile will be able to see your contacts details.
                  </Typography>
                </div>
                <Switch />
              </Box>
              <Divider />
              <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", mt: 3 }}>
                <div>
                  <Typography variant="subtitle1">Available to hire</Typography>
                  <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
                    Toggling this will let your teammates know that you are available for acquiring new projects.
                  </Typography>
                </div>
                <Switch defaultChecked />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Delete Account</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 3 }} variant="subtitle1">
                Delete your account and all of your source data. This is irreversible.
              </Typography>
              <Button color="error" variant="outlined">
                Delete account
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Box>
  );
};
