// https://ant.design/components/menu#menu
import { Menu as AntMenu, MenuProps } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  QuestionOutlined,
  ExperimentOutlined,
  FileAddOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <a
      href="https://www.aizatto.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      aizatto.com
    </a>,
    "aizatto.com",
    <FileAddOutlined />
  ),
  getItem(
    <a href="https://www.build.my/" target="_blank" rel="noopener noreferrer">
      build.my
    </a>,
    "build.my",
    <ExperimentOutlined />
  ),
  getItem(
    <a
      href="https://www.deepthought.app/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Deep Thought
    </a>,
    "deepthought",
    <QuestionOutlined />
  ),
  getItem(
    <a
      href="https://www.github.com/aizatto/timestamp-js/"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
    </a>,
    "github",
    <GithubOutlined />
  ),
  getItem(
    <a
      href="https://www.linkedin.com/in/aizatto/"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
    </a>,
    "linkedin",
    <LinkedinOutlined />
  ),
  getItem(
    <a href="/v1/" target="_blank" rel="noopener noreferrer">
      v1
    </a>,
    "v1",
    <HistoryOutlined />
  ),
];

export const Menu: React.FC = () => {
  return <AntMenu mode="horizontal" items={items} />;
};
