export enum KeyCode {
  //  DIGIT_0 = 48,
  DIGIT_1 = 49,
  DIGIT_9 = 57,
  A = 65,
  T = 84,
  Z = 90,
  t = 116,
}

export const KeyboardShortcuts: React.FC = () => {
  return (
    <>
      Keyboard Shortcuts:
      <ul>
        <li>
          Press any key from <code>A to Z</code> to refresh. Case insensitive.
        </li>
        <li>
          Press <code>T</code> or <code>t</code> to toggle displaying of
          timezones.
        </li>
        <li>
          Press any key from <code>1 to 0</code> to copy to clipboard.
        </li>
      </ul>
    </>
  );
};
