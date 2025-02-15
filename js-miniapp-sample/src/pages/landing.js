import React, { useEffect } from 'react';

import { CardContent, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import GreyCard from '../components/GreyCard';
import {
  setHostEnvironmentInfo,
  onSecureStorageReady,
} from '../services/landing/actions';

type LandingProps = {
  platform: ?string,
  platformVersion: ?string,
  hostVersion: ?string,
  sdkVersion: ?string,
  hostLocale: ?string,
  infoError: string,
  getHostInfo: Function,
  onSecureStorageReady: Function,
  secureStorageStatus: string,
};

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
    '& p': {
      lineHeight: 1.5,
    },
  },
  info: {
    fontSize: 16,
    lineBreak: 'anywhere',
    wordBreak: 'break-all',
    marginTop: 0,
  },
  button: {
    minHeight: 40,
    margin: 0,
  },
}));

const Landing = (props: LandingProps) => {
  const classes = useStyles();
  useEffect(() => {
    try {
      props.getHostInfo();
      checkSecureStorageStorageReady(props);
    } catch (e) {
      console.log(e);
    }
  }, [props]);

  return (
    <GreyCard className={classes.card}>
      <CardContent className={classes.content}>
        <p>Demo Mini App JS SDK</p>
        <p className={classes.info}>
          Platform: {props.platform ?? props.infoError ?? 'Unknown'}
          <br />
          Platform Version: {props.platformVersion ?? '-'}
          <br />
          Host Version: {props.hostVersion ?? '-'}
          <br />
          SDK Version: {props.sdkVersion ?? '-'}
          <br />
          Host Locale: {props.hostLocale ?? '-'}
        </p>
        <p className={classes.info}>
          Query Parameters: {window.location.search || 'None'}
        </p>
        <p className={classes.info}>
          URL Fragment: {window.location.hash || 'None'}
        </p>
        <p className={classes.info}>
          Secure Storage Status: {props.secureStorageStatus}
        </p>
      </CardContent>
    </GreyCard>
  );
};

function checkSecureStorageStorageReady(props: LandingProps) {
  props
    .onSecureStorageReady()
    .then((response) => {
      console.log('Page - checkSecureStorageStorageReady - Success', response);
    })
    .catch((miniAppError) => {
      console.log(
        'Page - checkSecureStorageStorageReady - Error: ',
        miniAppError
      );
    });
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    platform: state.info.platform,
    platformVersion: state.info.platformVersion,
    hostVersion: state.info.hostVersion,
    sdkVersion: state.info.sdkVersion,
    hostLocale: state.info.hostLocale,
    infoError: state.info.infoError,
    secureStorageStatus:
      (state.secureStorageStatus.isReady && 'Ready') ||
      state.secureStorageStatus.error ||
      'Not Ready',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHostInfo: () => dispatch(setHostEnvironmentInfo()),
    onSecureStorageReady: () => dispatch(onSecureStorageReady()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
