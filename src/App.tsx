import React, { Component, useState } from 'react';
import strftime from 'strftime';
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import Navbar from './Navbar';
import moment from 'moment';
const {CopyToClipboard} = require('react-copy-to-clipboard');

const initialDate = new Date();
const initialMoment = moment();

const DateContext = React.createContext<Date>(new Date());
const MomentContext = React.createContext<moment.Moment>(initialMoment);

function Field(props: {content: string, code: string}) {
  return (
    <div className="mb-2">
      <code>{props.code}</code>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <CopyToClipboard text={props.content}>
            <Button>Copy</Button>
          </CopyToClipboard>
        </InputGroupAddon>
        <Input value={props.content} readOnly />
      </InputGroup>
    </div>
  );
}

function Time(props: {fmt: string}) {
  return (
    <DateContext.Consumer>
      {(date) => {
        const str = strftime(props.fmt, date);
        return <Field code={`strftime("${props.fmt}")`} content={str} />;
      }}
    </DateContext.Consumer>
  );
}

function Moment(props: {fmt: string}) {
  return (
    <MomentContext.Consumer>
      {(mmt) => {
        const str = mmt.format(props.fmt);
        return <Field code={`moment().format("${props.fmt}")`} content={str} />;
      }}
    </MomentContext.Consumer>
  );
}

function App() {
  let [date, setDate] = useState(initialDate);
  let [mmt, setMoment] = useState(initialMoment);

  const onClick = () => {
    setMoment(moment());
    setDate(new Date());
  }

  return (
    <div>
      <DateContext.Provider value={date}>
        <MomentContext.Provider value={mmt}>
          <Navbar />
          <Container className="pt-3">
            <Button onClick={onClick} className="float-right">Refresh</Button>
            <h1><code>Frequently Used</code></h1>
            <Moment fmt="YYYY/MM/DD LTS - [W]W/[D]E dddd" />
            <Moment fmt="YYYY/MM/DD [W]W/[D]E dddd" />
            <Moment fmt="LTS: " />
            <h1><code>Date</code></h1>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date</a>
            <Field code="Math.floor(Date.now() / 1000)" content={Math.floor(Date.now() / 1000).toString()} />
            <Field code="Date.now()" content={Date.now().toString()} />
            <Field code="new Date().toISOString()" content={new Date().toISOString()} />
            <h1><code>strftime</code></h1>
            <a href="https://www.npmjs.com/package/strftime">https://www.npmjs.com/package/strftime</a>
            <Time fmt="%H:%M%P" />
            <Time fmt="%Y/%m/%d" />
            <Time fmt="%Y/%m/%d %H:%M:%S%P" />
            <h1><code>moment</code></h1>
            <a href="http://momentjs.com/">http://momentjs.com/</a>
            <Moment fmt="dddd Do MMMM YYYY LTS" />
            <Moment fmt="YYYY/MM/DD LTS - [W]W/[D]E dddd" />
            Packages:
            <ul>
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date</a></li>
              <li><a href="https://www.npmjs.com/package/strftime">https://www.npmjs.com/package/strftime</a></li>
              <li><a href="http://momentjs.com/">http://momentjs.com/</a></li>
              <li><a href="https://date-fns.org/">https://date-fns.org/</a></li>
            </ul>
          </Container>
        </MomentContext.Provider>
      </DateContext.Provider>
    </div>
  );
}

export default App;
