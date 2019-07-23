import React, { useContext, useImperativeHandle } from 'react';
import { Alert, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import strftime from 'strftime';
import SettingsContext from './SettingsContext';

export const Field = React.forwardRef((props: {content: string, code: string, fmtKey?: string}, ref) => {
  const { clipboard, setClipboard } = useContext(SettingsContext);

  const copied = clipboard === props.content;

  useImperativeHandle(
    ref,
    () => ({
      fmtKey: props.fmtKey,
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

  const inputType = props.content.includes("\n") ? 'textarea' : 'text';

  return (
    <div className="mb-2">
      <code>{props.code.replace(/\n/g, "\\n")}</code>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <Button onClick={onClick}>Copy</Button>
        </InputGroupAddon>
        <Input type={inputType} value={props.content} readOnly />
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

export const Moment = React.forwardRef((props: {fmt: string, fmtKey?: string, prefix?: string }, ref) => {
  const { moment: mmt } = useContext(SettingsContext);
  const str = mmt.format(props.fmt);
  return <Field fmtKey={props.fmtKey} ref={ref} code={`${props.prefix}moment().format("${props.fmt}")`} content={str} />;
});
