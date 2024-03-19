import { Edge, Node, NodeDetails } from './interface';

export const saveMindMap = (
  nodes: Node[],
  edges: Edge[],
  nodeDetails: NodeDetails[]
) => {
  const data = { nodes, edges, nodeDetails };
  localStorage.setItem('mindMapData', JSON.stringify(data));
};

export const loadMindMap = () => {
  const data = localStorage.getItem('mindMapData');
  return data ? JSON.parse(data) : null;
};
