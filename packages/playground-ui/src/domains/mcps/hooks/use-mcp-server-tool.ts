import { usePlaygroundStore } from '@mastra/playground-ui';
import { useMastraClient } from '@mastra/react';
import { useQuery } from '@tanstack/react-query';

export const useMCPServerTool = (serverId: string, toolId: string) => {
  const { runtimeContext } = usePlaygroundStore();
  const client = useMastraClient();

  return useQuery({
    queryKey: ['mcp-server-tool', serverId, toolId],
    queryFn: () => {
      return client.getMcpServerTool(serverId, toolId).details(runtimeContext);
    },
  });
};
