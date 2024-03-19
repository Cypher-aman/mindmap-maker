import { createContext, useState } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';

//disable typescript

interface ReactFlowElContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodes: any;
  setNodes: any;
  edges: any;
  setEdges: any;
  nodeDetails: any;
  setNodeDetails: any;
  onNodesChange: any;
  onEdgesChange: any;
}

export const ReactFlowElContext = createContext<ReactFlowElContext>({
  nodes: [],
  setNodes: () => {},
  edges: [],
  setEdges: () => {},
  nodeDetails: [],
  setNodeDetails: () => {},
  onNodesChange: () => {},
  onEdgesChange: () => {},
});

const ReactFlowEl = ({ children }: { children: React.ReactNode }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeDetails, setNodeDetails] = useState([]);

  return (
    <ReactFlowElContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        nodeDetails,
        setNodeDetails,
        onNodesChange,
        onEdgesChange,
      }}
    >
      {children}
    </ReactFlowElContext.Provider>
  );
};

export default ReactFlowEl;
