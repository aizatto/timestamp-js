import React, { Component } from 'react';
import strftime from 'strftime';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import Navbar from './Navbar.js';
import moment from 'moment';

const mmt = moment();

class Field extends Component {

  render() {
    return (
      <div className="mb-2">
        <code>{this.props.code}</code>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <CopyToClipboard text={this.props.content}>
              <Button>Copy</Button>
            </CopyToClipboard>
          </InputGroupAddon>
          <Input value={this.props.content} readOnly />
        </InputGroup>
      </div>
    );
  }

}

class Time extends Component {

  render() {
    const str = strftime(this.props.fmt);
    return <Field code={`strftime("${this.props.fmt}")`} content={str} />;
  }

}

class Moment extends Component {

  render() {
    const str = mmt.format(this.props.fmt);
    return <Field code={`moment().format("${this.props.fmt}")`} content={str} />;
  }

}

class App extends Component {

  render() {
    
    return (
      <div>
        <Navbar />
        <Container className="pt-3">
          <h1><code>Frequently Used</code></h1>
          <Moment fmt="YYYY/MM/DD LTS - [W]W/[D]E dddd" />
          <Moment fmt="YYYY/MM/DD [W]W/[D]E dddd" />
          <Moment fmt="LTS: " />
          <h1><code>Date</code></h1>
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date</a>
          <Field code="Math.floor(Date.now() / 1000)" content={Math.floor(Date.now() / 1000)} />
          <Field code="Date.now()" content={Date.now()} />
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
          </ul>
        </Container>
      </div>
    );
  }

}

export default App;
