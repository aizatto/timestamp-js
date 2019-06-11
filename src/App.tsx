/* eslint-env browser */
/* eslint-disable react/no-multi-comp */
import React, { useContext, useState, useRef } from 'react';
import { Alert, Button, Container } from 'reactstrap';
import moment from 'moment';
import copyToClipboard from 'copy-to-clipboard';
import { dayOfYear } from 'aizatto/lib/fn';
import Navbar from './Navbar';
import { Field, Time, Moment } from './Field';
import SettingsContext from './SettingsContext';
import "./bootstrap.min.css";

interface CopyHandler {
  value: () => string,
}

/* eslint-disable no-unused-vars */
enum KeyCode {
//  DIGIT_0 = 48,
  DIGIT_1 = 49,
  DIGIT_9 = 57,
  A = 65,
  Z = 90,
}

enum KeyboardToIndex {
  KEY_1 = 0,
  KEY_2,
  KEY_3,
  KEY_4,
  KEY_5,
  KEY_6,
}
/* eslint-enable -no-unused-vars */

function App() {
  const settings = useContext(SettingsContext);

  const [date, setDate] = useState(settings.date);
  const [mmt, setMoment] = useState(settings.moment);
  const [alertText, setAlertText] = useState<JSX.Element | null>();
  const windowOnKeyDownListener = useRef<(event: KeyboardEvent) => void>();

  // I don't use a loop because it is a Hook Rule to not place hooks
  // in loops
  // See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
  const refs = [
    useRef({} as CopyHandler),
    useRef({} as CopyHandler),
    useRef({} as CopyHandler),
    useRef({} as CopyHandler),
    useRef({} as CopyHandler),
    useRef({} as CopyHandler),
  ];

  const refreshTimestamps = () => {
    const newDate = new Date();
    const newMoment = moment();

    settings.clipboard = '';
    settings.date = newDate;
    settings.moment = newMoment;
    setDate(newDate);
    setMoment(newMoment);
    setAlertText(
      <>
        Refreshed at: 
        {' '}
        <code>{newMoment.format("YYYY/MM/DD LTS - [W]W/[D]E dddd")}</code>
      </>
    );
  }

  if (!windowOnKeyDownListener.current) {
    settings.setClipboard = (value: string) => {
      settings.clipboard = value;
      copyToClipboard(value);
      setAlertText(
        <>
        Copied to clipboard:
          {' '}
          <code>{value}</code>
        </>
      );
    }
    const listener = (event: KeyboardEvent) => {
      if (event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey) {
        return;
      }

      if ((KeyCode.DIGIT_1 <= event.keyCode && event.keyCode <= KeyCode.DIGIT_9)) {
        const index = event.keyCode - KeyCode.DIGIT_1;
        const ref = refs[index];
        if (ref && ref.current && ref.current.value) {
          const value = ref.current.value();
          settings.setClipboard(value);
        }
      }
      if ((KeyCode.A <= event.keyCode && event.keyCode <= KeyCode.Z)) {
        refreshTimestamps();
      }
    };
    windowOnKeyDownListener.current = listener;
    window.addEventListener('keydown', listener);
  }
  
  const alertBox = alertText 
    ? <Alert color="success">{alertText}</Alert>
    : null;

  const doy = dayOfYear(settings.date);

  return (
    <div>
      <SettingsContext.Provider value={settings}>
        <Navbar />
        <Container className="pt-3">
          {alertBox}
          <Button onClick={refreshTimestamps} className="float-right">Refresh</Button>
          <h1><code>Frequently Used</code></h1>
          <Moment ref={refs[KeyboardToIndex.KEY_1]} fmt="LTS: " />
          <Moment ref={refs[KeyboardToIndex.KEY_2]} fmt={`YYYY/MM/DD [W]W/[D]E dddd - [D]${doy}/366[R] [\n]LTS: `} />
          <Moment ref={refs[KeyboardToIndex.KEY_3]} fmt="YYYY/MM/DD LTS - [W]W/[D]E dddd" />
          <Moment ref={refs[KeyboardToIndex.KEY_4]} fmt="YYYY/MM/DD [W]W/[D]E dddd" />
          <Moment ref={refs[KeyboardToIndex.KEY_5]} fmt={`YYYY/MM/DD LTS - [W]W/[D]E dddd - [D]${doy}/366[R]`} />
          <Moment ref={refs[KeyboardToIndex.KEY_6]} fmt={`YYYY[W]W: YYYY/MM/DD`} />
          <h1><code>Date</code></h1>
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">
            MDN: Date
          </a>
          <Field code="Math.floor(Date.now() / 1000)" content={Math.floor(date.getTime() / 1000).toString()} />
          <Field code="Date.now()" content={date.getTime().toString()} />
          <Field code="new Date().toISOString()" content={date.toISOString()} />
          <h1><code>strftime</code></h1>
          <a href="https://www.npmjs.com/package/strftime">https://www.npmjs.com/package/strftime</a>
          <Time fmt="%H:%M%P" />
          <Time fmt="%Y/%m/%d" />
          <Time fmt="%Y/%m/%d %H:%M:%S%P" />
          <Time fmt="%Y%m%d%H%M%S %Y %b %d" />
          <h1><code>moment</code></h1>
          <a href="http://momentjs.com/">http://momentjs.com/</a>
          <Moment fmt="dddd Do MMMM YYYY LTS" />
          <Moment fmt="YYYY/MM/DD LTS - [W]W/[D]E dddd" />
          Keyboard Shortcuts:
          <ul>
            <li>
              Press any key from
              {' '}
              <code>A to Z</code>
              {' '}
              to refresh. Case insensitive.
            </li>
            <li>
              Press any key from
              {' '}
              <code>1 to 0</code>
              {' '}
              to copy to clipboard.
            </li>
          </ul>
          Packages:
          <ul>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">
            MDN: Date
              </a>
            </li>
            <li><a href="https://www.npmjs.com/package/strftime">https://www.npmjs.com/package/strftime</a></li>
            <li><a href="http://momentjs.com/">http://momentjs.com/</a></li>
            <li><a href="https://date-fns.org/">https://date-fns.org/</a></li>
          </ul>
        </Container>
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
