export interface Node {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
  };
  type: string;
  style: {
    backgroundColor: string;
    color: string;
    borderColor: string;
  };
  width: number;
  height: number;
  selected: boolean;
  positionAbsolute: {
    x: number;
    y: number;
  };
  dragging: boolean;
}

export interface Edge {
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  type: string;
  style: {
    stroke: string;
  };
  id: string;
}

export interface NodeDetails {
  nodeId: string;
  id: string;
  data: string;
}

export interface Menu {
  id: string;
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
}
