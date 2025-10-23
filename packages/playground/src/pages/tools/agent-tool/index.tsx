import { Link, useParams } from 'react-router';

import { ToolPanel } from '@mastra/playground-ui';

import {
  Header,
  Crumb,
  Breadcrumb,
  MainContentLayout,
  AgentIcon,
  Icon,
  HeaderAction,
  Button,
  DocsIcon,
} from '@mastra/playground-ui';

const AgentTool = () => {
  const { toolId, agentId } = useParams();

  return (
    <MainContentLayout>
      <Header>
        <Breadcrumb>
          <Crumb as={Link} to={`/agents`}>
            <Icon>
              <AgentIcon />
            </Icon>
            Agents
          </Crumb>
          <Crumb as={Link} to={`/agents/${agentId}/chat`}>
            {agentId}
          </Crumb>
          <Crumb as={Link} to={`/tools/${agentId}/${toolId}`} isCurrent>
            {toolId}
          </Crumb>
        </Breadcrumb>

        <HeaderAction>
          <Button as={Link} to="https://mastra.ai/en/docs/agents/using-tools-and-mcp" target="_blank">
            <Icon>
              <DocsIcon />
            </Icon>
            Tools documentation
          </Button>
        </HeaderAction>
      </Header>

      <ToolPanel toolId={toolId!} />
    </MainContentLayout>
  );
};

export default AgentTool;
