import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { options } from './menu-options';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { CSSTransition } from 'react-transition-group';
import styles from '../../styles/sidebar/menuOptionsAcordion.module.scss';

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title, dropdown } = props;
  const [displayed, setDisplayed] = useState(false);
  const [rotate, setRotate] = useState({});
  const menu = useRef(null);
  const router = useRouter();

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <li onClick={() => {
      setDisplayed(!displayed)
      setRotate(styles.iconRotate)
    }} >
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'primary.main'
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title}
        </Box>
        {dropdown && ( 
          <Box
            component="span"
            sx={{ 
              color: 'neutral.400',
              display: 'flex',
              alignItems: 'baseline',
              ...(active && {
                color: 'primary.main'
              })
            }}
          >
            <ArrowForwardIosIcon className={rotate} style={{ transform: !displayed ? 'rotate(0deg)' : '' }} />
          </Box>
        )}
      </ButtonBase>
      {dropdown && options.map(option => (
        <ButtonBase
          sx={{
            borderRadius: 1,
            textAlign: 'left',
            width: '100%',
            color: 'neutral.400',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
          onClick={() => router.push(option.path)}
        >
          <CSSTransition nodeRef={menu} in={displayed} timeout={200} classNames={styles.menuTransition} > 
            <section
              style={{
                display: (displayed ? 'inherit' : 'none'),
                justifyContent: 'start',
                width: 'inherit',
                paddingLeft: '3em',
              }}
              ref={menu}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '1em'
              }} >{option.icon}</div>
              <p>{option.title}</p>
            </section>
          </CSSTransition>
        </ButtonBase>
      ))}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
