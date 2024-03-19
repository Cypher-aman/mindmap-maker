import { createContext, useState } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import { NodeDetails } from '../utils/interface';

interface ReactFlowElContextInterface {
  nodes: any;
  setNodes: any;
  edges: any;
  setEdges: any;
  nodeDetails: NodeDetails[];
  setNodeDetails: any;
  onNodesChange: any;
  onEdgesChange: any;
}

export const ReactFlowElContext =
  createContext<ReactFlowElContextInterface | null>(null);

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
