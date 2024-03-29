import { Button, DatePicker, Input, Radio, message } from "antd";
import React, { useEffect, useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import { KeyboardShortcuts, KeyCode } from "./keyboard";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { dayOfYear } from "../dayOfYear";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export const Page: React.FC = () => {
  let [date, setDate] = useState(dayjs());
  let [displayTimezones, setDisplayTimezones] = useLocalStorage(
    "display-timezones",
    true
  );
  let [inputs, setInputs] = useState<React.ReactNode[]>();
  let [disableKeyboardShortcut, setDisableKeyboardShortcut] = useState(false);

  const copyFromFormats = (index: number) => {
    const format = formats[index];
    const momentformat = displayTimezones
      ? format.withTimezone
      : format.withoutTimezone;

    const value = date.format(momentformat);
    copy(value);
    message.success(
      <>
        Copied to Clipboard:<pre>{value}</pre>
      </>
    );
  };

  useEffect(() => {
    if (disableKeyboardShortcut) {
      return;
    }

    const listener = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      if (
        KeyCode.DIGIT_1 <= event.keyCode &&
        event.keyCode <= KeyCode.DIGIT_9
      ) {
        const index = event.keyCode - KeyCode.DIGIT_1;
        copyFromFormats(index);
      }
      if (event.keyCode === KeyCode.T || event.keyCode === KeyCode.t) {
        setDisplayTimezones(!displayTimezones);
      } else if (KeyCode.A <= event.keyCode && event.keyCode <= KeyCode.Z) {
        setDate(dayjs());
      }
    };

    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [disableKeyboardShortcut, displayTimezones]);

  const doy = dayOfYear(date.toDate());

  const formats = [
    {
      withTimezone: `YYYY/MM/DD [W]W/[D]E dddd MMMM Do - [D]${doy}/366[R] LTS Z: `,
      withoutTimezone: `YYYY/MM/DD [W]W/[D]E dddd MMMM Do - [D]${doy}/366[R] LTS: `,
    },
    {
      withTimezone: `YYYY/MM/DD [W]W/[D]E dddd MMMM Do - [D]${doy}/366[R]`,
      withoutTimezone: `YYYY/MM/DD [W]W/[D]E dddd MMMM Do - [D]${doy}/366[R]`,
    },
    {
      withTimezone: "LTS Z: ",
      withoutTimezone: "LTS: ",
    },
  ];

  useEffect(() => {
    const newInputs = formats.map((format, index) => {
      const dateformat = displayTimezones
        ? format.withTimezone
        : format.withoutTimezone;

      const value = date.format(dateformat);
      // const value = ''

      const onClick = () => {
        copyFromFormats(index);
      };

      return (
        <li key={`format-${index}`}>
          <code>
            {index + 1}: moment().format("{dateformat}")
          </code>
          <div className="input">
            <Button type="primary" icon={<CopyOutlined />} onClick={onClick} />
            <Input
              value={value}
              readOnly
              onClick={onClick}
              style={{ display: "inline" }}
            />
          </div>
        </li>
      );
    });

    setInputs(newInputs);
    // eslint-disable-next-line
  }, [displayTimezones, date]);

  return (
    <div id="page">
      <DatePicker
        showTime
        onChange={(newDate) => {
          if (!newDate) {
            return;
          }
          setDate(newDate);
        }}
        value={date}
        onOpenChange={(open) => {
          setDisableKeyboardShortcut(open);
        }}
      />{" "}
      <Radio.Group
        onChange={(e) => {
          const value = e.target.value;
          setDisplayTimezones(value);
        }}
        value={displayTimezones}
      >
        <Radio value={true}>Show Timezones</Radio>
        <Radio value={false}>Hide Timezones</Radio>
      </Radio.Group>
      <ul className="inputs">{inputs}</ul>
      <KeyboardShortcuts />
      References
      <ul>
        <li>
          Ant Design
          <ul>
            <li>
              <a href="https://ant.design/components/date-picker/">
                DatePicker
              </a>
            </li>
            <li>
              <a href="https://ant.design/components/icon/">Icon</a>
            </li>
            <li>
              <a href="https://ant.design/components/input/">Input</a>
            </li>
            <li>
              <a href="https://ant.design/components/menu/">Menu</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
