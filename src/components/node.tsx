import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  ConnectionLineType,
  useReactFlow,
  ReactFlowProvider,
  Background,
  useStoreApi,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './customNode';
import ContextMenu from './contextMenu';
import Sidebar from './ui/sidebar';
import { IoSaveSharp } from 'react-icons/io5';
import { IoMdDownload, IoIosAddCircle } from 'react-icons/io';
import { saveMindMap, loadMindMap } from '../utils/storage';
import toast from 'react-hot-toast';
import { ReactFlowElContext } from '../providers/ReactFlowEl';
import DownloadButton from './downloadImage';
import initialData from '../utils/data';

const nodeTypes = {
  default: CustomNode,
};

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
    type: 'default',
    style: { backgroundColor: '#2196f3', color: 'white', borderColor: 'white' },
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'World' },
  },
];

const MindMap = () => {
  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    nodeDetails,
    setNodeDetails,
    onNodesChange,
    onEdgesChange,
  } = useContext(ReactFlowElContext);
  const [menu, setMenu] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popover, setPopover] = useState(null);
  const [activeNodeId, setActiveNodeId] = useState<string>('');
  const [newNodeName, setNewNodeName] = useState<string>('');
  const ref = useRef<HTMLDivElement>();
  const { addNodes } = useReactFlow();
  const store = useStoreApi();

  useEffect(() => {
    const data = loadMindMap();
    if (data) {
      setNodes(data.nodes || []);
      setEdges(data.edges || []);
      setNodeDetails(data.nodeDetails || []);
    } else {
      setNodes(initialData.initialNodes);
      setEdges(initialData.initialEdges);
      setNodeDetails(initialData.initialNodeDetails);
    }
  }, []);

  const onNodeChange = useCallback(
    (change) => setNodes((nodes) => applyNodeChanges(change, nodes)),
    []
  );
  const onEdgeChange = useCallback(
    (change) => setEdges((edges) => applyEdgeChanges(change, edges)),
    []
  );

  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) =>
        addEdge(
          { ...connection, type: 'smoothstep', style: { stroke: '#964B00' } },
          eds
        )
      ),
    []
  );

  const onNodeContextMenu = useCallback(
    (e, node) => {
      // Prevent native context menu from showing
      e.preventDefault();
      setActiveNodeId(node.id);
      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      if (!ref?.current) return;
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: e.clientY < pane.height - 200 && e.clientY,
        left: e.clientX < pane.width - 200 && e.clientX,
        right: e.clientX >= pane.width - 200 && pane.width - e.clientX,
        bottom: e.clientY >= pane.height - 200 && pane.height - e.clientY,
      });
    },
    [setMenu, ref]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  let currentOverlapOffset = 0;
  const OVERLAP_OFFSET = 50;
  const NODE_WIDTH = 116;
  const NODE_HEIGHT = 28;

  const onClick = useCallback(() => {
    const {
      height,
      width,
      transform: [transformX, transformY, zoomLevel],
    } = store.getState();
    const zoomMultiplier = 1 / zoomLevel;
    const centerX = -transformX * zoomMultiplier + (width * zoomMultiplier) / 2;
    const centerY =
      -transformY * zoomMultiplier + (height * zoomMultiplier) / 2;
    const nodeWidthOffset = NODE_WIDTH / 2;
    const nodeHeightOffset = NODE_HEIGHT / 2;

    const id = String(Date.now());
    const newNode = {
      id,
      position: {
        x: centerX - nodeWidthOffset + currentOverlapOffset,
        y: centerY - nodeHeightOffset + currentOverlapOffset,
      },
      data: {
        label: newNodeName || 'New Node',
      },
      type: 'default',
      style: {
        backgroundColor: '#2196f3',
        color: 'white',
        borderColor: 'white',
      },
    };

    setNodeDetails((ndD) =>
      ndD.concat({
        nodeId: id,
        id: String(Date.now()),
        data: `This is popover data for ${newNode.data.label}`,
      })
    );

    setNewNodeName('');
    addNodes(newNode);

    // Purely for example's sake (so multiple new nodes don't appear directly on top of each other)
    currentOverlapOffset += OVERLAP_OFFSET;
  }, [addNodes, store, nodes, newNodeName]);

  const onNodeMouseEnter = useCallback(
    (event, node) => {
      const detail = nodeDetails.filter((nd) => nd.nodeId === node.id)[0];

      setPopover(detail);
    },
    [nodeDetails]
  );

  const onNodeMouseLeave = useCallback(() => {
    setPopover(null);
  }, []);

  const handleSaveClick = () => {
    saveMindMap(nodes, edges, nodeDetails);
    toast.success('Saved!');
  };

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        ref={ref}
        snapToGrid
        onLoad={onLoad}
        style={{
          backgroundColor: '#e1e0f7',
        }}
        connectionLineType={ConnectionLineType.Step}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        fitView
      >
        <Background />
        <Controls />
        {menu && (
          <ContextMenu
            onClick={onPaneClick}
            {...menu}
            setSidebarOpen={setSidebarOpen}
          />
        )}
      </ReactFlow>
      <div className=" flex p-2 gap-3">
        <div className="flex gap-3">
          <input
            type="text"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            className="w-52 rounded px-2 py-1 border-[1px] border-gray-500"
          />
          <button
            className="px-2 py-1 bg-green-500 rounded  text-white flex gap-2 items-center"
            onClick={onClick}
          >
            <IoIosAddCircle /> Add Node
          </button>
        </div>
        <button
          className="px-2 py-1 bg-purple-500 rounded  text-white flex gap-2 items-center"
          onClick={handleSaveClick}
        >
          <IoSaveSharp /> Save Map
        </button>

        <DownloadButton />
      </div>
      {popover && (
        <div className="absolute top-5 right-5 p-4 rounded-md shadow-md bg-white">
          <h2 className="text-lg font-semibold text-center mb-3">
            {popover.data}
          </h2>
        </div>
      )}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        nodeId={activeNodeId}
      />
    </div>
  );
};

const ReactFlowContainer = () => {
  return (
    <ReactFlowProvider>
      <MindMap />
    </ReactFlowProvider>
  );
};

export default ReactFlowContainer;
