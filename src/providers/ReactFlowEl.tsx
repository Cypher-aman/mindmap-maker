import { createContext, useState } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';

export const ReactFlowElContext = createContext<unknown>({});

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
