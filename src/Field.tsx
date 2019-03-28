import React, { useContext, useImperativeHandle } from 'react';
import { Alert, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import strftime from 'strftime';
import SettingsContext from './SettingsContext';

export const Field = React.forwardRef((props: {content: string, code: string}, ref) => {
  const { clipboard, setClipboard } = useContext(SettingsContext);

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

export const Time = React.forwardRef((props: {fmt: string}, ref) => {
  const { date } = useContext(SettingsContext);
  const str = strftime(props.fmt, date);
  return <Field ref={ref} code={`strftime("${props.fmt}")`} content={str} />;
});

export const Moment = React.forwardRef((props: {fmt: string }, ref) => {
  const { moment: mmt } = useContext(SettingsContext);
  const str = mmt.format(props.fmt);
  return <Field ref={ref} code={`moment().format("${props.fmt}")`} content={str} />;
});
