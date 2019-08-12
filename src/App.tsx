/* eslint-env browser */
/* eslint-disable react/no-multi-comp */
import React, { useContext, useState, useRef } from 'react';
import { Alert, Button, Container } from 'reactstrap';
import moment from 'moment';
import copyToClipboard from 'copy-to-clipboard';
import { dayOfYear } from 'aizatto/lib/fn';

// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

import Navbar from './Navbar';
import { Field, Time, Moment } from './Field';
import SettingsContext from './SettingsContext';
import "./bootstrap.min.css";
import { DB, formats } from './DB';

interface CopyHandler {
  fmtKey?: string,
  value: () => string,
}

enum KeyCode {
//  DIGIT_0 = 48,
  DIGIT_1 = 49,
  DIGIT_9 = 57,
  A = 65,
  Z = 90,
}

const db = new DB();

function App() {
  const settings = useContext(SettingsContext);

  const [datepickerFocus, setDatepickerFocus] = useState(false);
  const [date, setDate] = useState(settings.date);
  const [, setMoment] = useState(settings.moment);
  const [alertText, setAlertText] = useState<JSX.Element | null>();
  const windowOnKeyDownListener = useRef<(event: KeyboardEvent) => void>();

  // I don't use a loop because it is a Hook Rule to not place hooks
  // in loops
  // See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
  const refs = [
    useRef({} as CopyHandler), // 1
    useRef({} as CopyHandler), // 2
    useRef({} as CopyHandler), // 3
    useRef({} as CopyHandler), // 4
    useRef({} as CopyHandler), // 5
    useRef({} as CopyHandler), // 6
    useRef({} as CopyHandler), // 7
  ];

  const setTimestamps = (newDate: Date) => {
    const newMoment = moment(newDate);

    settings.clipboard = '';
    settings.date = newDate;
    settings.moment = newMoment;
    setDate(newDate);
    setMoment(newMoment);
    setAlertText(
      <>
        Refreshed to:
        {' '}
        <code>{newMoment.format("YYYY/MM/DD LTS - [W]W/[D]E dddd")}</code>
      </>
    );
  }

  const refreshTimestamps = () => {
    setTimestamps(new Date());
  }

  if (!windowOnKeyDownListener.current) {
    settings.setClipboard = (value: string) => {
      if (datepickerFocus) {
        return;
      }
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
      if (datepickerFocus ||
          event.altKey ||
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
          const fmtKey = ref.current.fmtKey;
          if (fmtKey) {
            db.increment(fmtKey);
          }
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
  const frequentlyUsed = db.popular().map(([key], index) => {
    const ref = refs[index];
    const format = formats[key].fn(doy as number);
    return (
      <Moment key={key} fmtKey={key} ref={ref} fmt={format} prefix={`${index + 1}: `} />
    );
  })

  return (
    <div>
      <SettingsContext.Provider value={settings}>
        <Navbar />
        <Container className="pt-3">
          {alertBox}
          <div className="mb-2">
          <Button onClick={refreshTimestamps} className="float-right">Refresh</Button>
          <DatePicker
            selected={date}
            onFocus={() => setDatepickerFocus(true)}
            onBlur={() => setDatepickerFocus(false)}
            onChange={(newDate: Date) => { setTimestamps(newDate); }}
            className="form-control"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm:ss aa"
            timeCaption="time"
            disabledKeyboardNavigation
          />
          </div>
          <h1><code>Frequently Used</code></h1>
          {frequentlyUsed}
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
