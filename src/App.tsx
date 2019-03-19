/* eslint-env browser */
/* eslint-disable react/no-multi-comp */
import React, { useContext, useState, useRef, useImperativeHandle } from 'react';
import strftime from 'strftime';
import {
  Alert,
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import moment from 'moment';
import copyToClipboard from 'copy-to-clipboard';
import Navbar from './Navbar';

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
}
/* eslint-enable -no-unused-vars */

const history = {
  dates: [
    new Date(),
  ],
  moments: [
    moment(),
  ]
};

const SettingsContext = React.createContext({
  date: history.dates[0],
  moment: history.moments[0],
  clipboard: '',
  setClipboard: (_: string) => {},
});

const Field = React.forwardRef((props: {content: string, code: string}, ref) => {
  const { date, clipboard, setClipboard } = useContext(SettingsContext);

  const copied = clipboard === props.content;

  useImperativeHandle(
    ref,
    () => ({
      value: () => {
        return props.content;
      }
    }),
    [props.content],
  );

  const onClick = () => {
    setClipboard(props.content);
  }

  const alertBox = copied
    ? (
      <Alert color="success" className="mt-1">
        <>
          Copied to clipboard:
          {' '}
          <code>{props.content}</code>
        </>
      </Alert>
)
    : null

  return (
    <div className="mb-2">
      <code>{props.code}</code>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <Button onClick={onClick}>Copy</Button>
        </InputGroupAddon>
        <Input value={props.content} readOnly />
      </InputGroup>
      {alertBox}
    </div>
  );
});

const Time = React.forwardRef((props: {fmt: string}, ref) => {
  const { date } = useContext(SettingsContext);
  const str = strftime(props.fmt, date);
  return <Field ref={ref} code={`strftime("${props.fmt}")`} content={str} />;
});

const Moment = React.forwardRef((props: {fmt: string }, ref) => {
  const { moment: mmt } = useContext(SettingsContext);
  const str = mmt.format(props.fmt);
  return <Field ref={ref} code={`moment().format("${props.fmt}")`} content={str} />;
});


function App() {
  const [date, setDate] = useState(history.dates[0]);
  const [mmt, setMoment] = useState(history.moments[0]);
  const [alertText, setAlertText] = useState<JSX.Element | null>();
  const windowOnKeyDownListener = useRef<(event: KeyboardEvent) => void>();

  const settings = useContext(SettingsContext);

  // I don't use a loop because it is a Hook Rule to not place hooks
  // in loops
  // See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
  const refs = [
    useRef({} as CopyHandler),
    useRef({} as CopyHandler),
    useRef({} as CopyHandler),
  ];

  const refreshTimestamps = () => {
    const newDate = new Date();
    const newMoment = moment();

    settings.date = newDate;
    settings.moment = newMoment;
    history.dates.push(newDate)
    history.moments.push(newMoment);
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

  return (
    <div>
      <SettingsContext.Provider value={settings}>
        <Navbar />
        <Container className="pt-3">
          {alertBox}
          <Button onClick={refreshTimestamps} className="float-right">Refresh</Button>
          <h1><code>Frequently Used</code></h1>
          <Moment ref={refs[KeyboardToIndex.KEY_1]} fmt="YYYY/MM/DD LTS - [W]W/[D]E dddd" />
          <Moment ref={refs[KeyboardToIndex.KEY_2]} fmt="YYYY/MM/DD [W]W/[D]E dddd" />
          <Moment ref={refs[KeyboardToIndex.KEY_3]} fmt="LTS: " />
          <h1><code>Date</code></h1>
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date</a>
          <Field code="Math.floor(Date.now() / 1000)" content={Math.floor(date.getTime() / 1000).toString()} />
          <Field code="Date.now()" content={date.getTime().toString()} />
          <Field code="new Date().toISOString()" content={date.toISOString()} />
          <h1><code>strftime</code></h1>
          <a href="https://www.npmjs.com/package/strftime">https://www.npmjs.com/package/strftime</a>
          <Time fmt="%H:%M%P" />
          <Time fmt="%Y/%m/%d" />
          <Time fmt="%Y/%m/%d %H:%M:%S%P" />
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
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date</a></li>
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
