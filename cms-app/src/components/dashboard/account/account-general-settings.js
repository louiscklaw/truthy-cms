import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Switch, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/use-auth';
import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';
import DebugPrint from '../../../components/debug-print';
import { useFormik } from 'formik';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const AccountGeneralSettings = props => {
  // To get the user from the authContext, you can use
  const { user } = useAuth();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [current_profile, setCurrentProfile] = useState({});

  const formik = useFormik({
    initialValues: current_profile,
    onSubmit: async (values, helpers) => {
      await axios
        .put('/api/auth/profile', values)
        .then(res => {
          toast.success(t('UPDATE_DONE'));
        })
        .catch(err => {
          console.log({ err });
        });
    },
  });

  useEffect(() => {
    axios
      .get('/api/auth/profile')
      .then(({ data }) => {
        setCurrentProfile(data);
        setIsLoading(false);
      })
      .catch(err => console.log({ err }));
  }, []);

  const [helloworld, setHelloworld] = useState(false);

  if (isLoading) return <>isLoading</>;

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <Box sx={{ mt: 4 }} {...props}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">{t('BASIC_DETAILS')}</Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                  <Avatar src={user.avatar} sx={{ height: 64, mr: 2, width: 64 }}>
                    <UserCircleIcon fontSize="small" />
                  </Avatar>
                  <Button>{t('Change')}</Button>
                </Box>
                <Box sx={{ display: 'flex', mt: 3, alignItems: 'center' }}>
                  <TextField defaultValue={user.name} label={t('FULL_NAME')} size="small" sx={{ flexGrow: 1, mr: 3 }} />
                  <Button>{t('Save')}</Button>
                </Box>
                <Box sx={{ display: 'flex', mt: 3, alignItems: 'center' }}>
                  <TextField
                    defaultValue={user?.email}
                    disabled
                    label={t('EMAIL_ADDRESS')}
                    required
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderStyle: 'dashed',
                      },
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
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 3,
                  }}
                >
                  <div>
                    <Typography variant="subtitle1">{t('MAKE_CONTACT_INFO_PUBLIC')}</Typography>
                    <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
                      Means that anyone viewing your profile will be able to see your contacts details.
                    </Typography>
                  </div>

                  <Switch
                    checked={formik.values.contact_info_public}
                    onChange={e => formik.setFieldValue('contact_info_public', e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Box>
                <Divider />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 3,
                  }}
                >
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
                <Typography variant="h6">{t('DELETE_ACCOUNT')}</Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Typography sx={{ mb: 3 }} variant="subtitle1">
                  Delete your account and all of your source data. This is irreversible.
                </Typography>
                <Button color="error" variant="outlined">
                  {t('DELETE_ACCOUNT')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <DebugPrint>{current_profile}</DebugPrint>
      </Box>
    </form>
  );
};
