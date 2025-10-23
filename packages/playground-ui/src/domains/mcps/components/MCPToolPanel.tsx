import { usePlaygroundStore } from '@/store/playground-store';
import { useExecuteTool } from '@/domains/tools/hooks/use-execute-tool';
import { resolveSerializedZodOutput } from '@/components/dynamic-form/utils';
import jsonSchemaToZod from 'json-schema-to-zod';
import { parse } from 'superjson';
import { z } from 'zod';
import { Txt } from '@/ds/components/Txt';
import ToolExecutor from '@/domains/tools/components/ToolExecutor';
import { useMCPServerTool } from '@/domains/mcps/hooks/use-mcp-server-tool';

export interface MCPToolPanelProps {
  toolId: string;
  serverId: string;
}

export const MCPToolPanel = ({ toolId, serverId }: MCPToolPanelProps) => {
  const { data: tool, isLoading } = useMCPServerTool(serverId, toolId);

  const { mutateAsync: executeTool, isPending: isExecuting, data: result } = useExecuteTool();
  const { runtimeContext: playgroundRuntimeContext } = usePlaygroundStore();

  const handleExecuteTool = async (data: any) => {
    if (!tool) return;

    return executeTool({
      toolId: tool.id,
      input: data,
      runtimeContext: playgroundRuntimeContext,
    });
  };

  if (isLoading) return null;
  if (!tool)
    return (
      <div className="py-12 text-center px-6">
        <Txt variant="header-md" className="text-icon3">
          Tool not found
        </Txt>
      </div>
    );

  console.log('loool', tool);

  const zodInputSchema = tool.inputSchema
    ? resolveSerializedZodOutput(jsonSchemaToZod(parse(tool.inputSchema)))
    : z.object({});

  return (
    <ToolExecutor
      executionResult={result}
      isExecutingTool={isExecuting}
      zodInputSchema={zodInputSchema}
      handleExecuteTool={handleExecuteTool}
      toolDescription={tool.description || ''}
      toolId={tool.id}
    />
  );
};
