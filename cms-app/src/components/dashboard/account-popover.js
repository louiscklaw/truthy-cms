import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Avatar, Box, Button, Divider, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../hooks/use-auth';
import { Cog as CogIcon } from '../../icons/cog';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { SwitchHorizontalOutlined as SwitchHorizontalOutlinedIcon } from '../../icons/switch-horizontal-outlined';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const AccountPopover = props => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const { logout } = useAuth();
  // To get the user from the authContext, you can use
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      onClose?.();
      await logout();
      router.push('/').catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error(t('UNABLE_TO_LOGOUT'));
    }
  };

  const go = url => {
    onClose?.();
    router.push(url).catch(console.error);
  };

  if (!user) return <>some error occured</>;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box sx={{ alignItems: 'center', p: 2, display: 'flex' }}>
        <Avatar src={user?.avatar} sx={{ height: 40, width: 40 }}>
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box sx={{ ml: 1 }}>
          <Typography variant="body1">{user?.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            {user?.country}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <MenuItem onClick={e => go('/dashboard/social/profile')}>
          <ListItemIcon>
            <SwitchHorizontalOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">{t('PROFILE')}</Typography>} />
        </MenuItem>

        <MenuItem onClick={e => go('/dashboard/account')}>
          <ListItemIcon>
            <SwitchHorizontalOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">{t('SETTINGS')}</Typography>} />
        </MenuItem>

        <MenuItem onClick={e => go('/dashboard')}>
          <ListItemIcon>
            <SwitchHorizontalOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">{t('CHANGE_ORGANIZATION')}</Typography>} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">{t('Logout')}</Typography>} />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
