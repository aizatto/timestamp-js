import React from 'react';
import moment from 'moment';

const SettingsContext = React.createContext({
  date: new Date(),
  moment: moment(),
  clipboard: '',
  setClipboard: (_: string) => {},
});

export default SettingsContext;
