import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { GuestGuard } from '../../components/authentication/guest-guard';
import { AuthBanner } from '../../components/authentication/auth-banner';
import { AmplifyLogin } from '../../components/authentication/amplify-login';
import { Auth0Login } from '../../components/authentication/auth0-login';
import { FirebaseLogin } from '../../components/authentication/firebase-login';
import { JWTLogin } from '../../components/authentication/jwt-login';
import { Logo } from '../../components/logo';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';

const platformIcons = {
  Amplify: '/static/icons/amplify.svg',
  Auth0: '/static/icons/auth0.svg',
  Firebase: '/static/icons/firebase.svg',
  JWT: '/static/icons/jwt.svg',
};

const Login = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Login | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          // backgroundColor: 'background.default',
          backgroundImage:
            'url("https://unsplash.com/photos/nmpW_WwwVSc/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHx8fDE2NTk2MjY1NDM&force=true&w=2400")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          bakcgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          minHeight: 'calc(100vh + 50px)',
          top: '-25px',
          width: 'calc(100vw + 50px)',
          left: '-25px',
          filter: 'blur(5px) grayscale(30%);',
          overflow: 'hidden',
        }}
      ></Box>
      <Box
        component="main"
        sx={{
          // backgroundColor: 'background.default',
          position: 'absolute',
          width: '100%',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          bakcgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: { xs: '60px', md: '120px' },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <NextLink href="/" passHref>
                <a>
                  <Logo sx={{ height: 40, width: 40 }} />
                </a>
              </NextLink>
              <Typography variant="h4">Log in</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, mt: 3 }}>
              {platform === 'Amplify' && <AmplifyLogin />}
              {platform === 'Auth0' && <Auth0Login />}
              {platform === 'Firebase' && <FirebaseLogin />}
              {platform === 'JWT' && <JWTLogin />}
            </Box>
            <Divider sx={{ my: 3 }} />
            <div>
              <NextLink
                href={
                  disableGuard ? `/authentication/register?disableGuard=${disableGuard}` : '/authentication/register'
                }
                passHref
              >
                <Link color="textSecondary" variant="body2">
                  Create new account
                </Link>
              </NextLink>
            </div>
            {platform === 'Amplify' && (
              <Box sx={{ mt: 1 }}>
                <NextLink
                  href={
                    disableGuard
                      ? `/authentication/password-recovery?disableGuard=${disableGuard}`
                      : '/authentication/password-recovery'
                  }
                  passHref
                >
                  <Link color="textSecondary" variant="body2">
                    Forgot password
                  </Link>
                </NextLink>
              </Box>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = page => <GuestGuard>{page}</GuestGuard>;

export default Login;
