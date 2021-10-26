import { Menu as AntMenu } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  QuestionOutlined,
  ExperimentOutlined,
  FileAddOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

export const Menu: React.FC = () => {
  return (
    <AntMenu mode="horizontal">
      <AntMenu.Item key="aizatto.com" icon={<FileAddOutlined />}>
        <a
          href="https://www.aizatto.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          aizatto.com
        </a>
      </AntMenu.Item>
      <AntMenu.Item key="build.my" icon={<ExperimentOutlined />}>
        <a
          href="https://www.build.my/"
          target="_blank"
          rel="noopener noreferrer"
        >
          build.my
        </a>
      </AntMenu.Item>
      <AntMenu.Item key="deepthought" icon={<QuestionOutlined />}>
        <a
          href="https://www.deepthought.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Deep Thought
        </a>
      </AntMenu.Item>
      <AntMenu.Item key="github" icon={<GithubOutlined />}>
        <a
          href="https://www.github.com/aizatto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </AntMenu.Item>
      <AntMenu.Item key="linkedin" icon={<LinkedinOutlined />}>
        <a
          href="https://www.linkedin.com/in/aizatto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </AntMenu.Item>
      <AntMenu.Item key="v1" icon={<HistoryOutlined />}>
        <a href="/v1" rel="noopener noreferrer">
          v1
        </a>
      </AntMenu.Item>
    </AntMenu>
  );
};
