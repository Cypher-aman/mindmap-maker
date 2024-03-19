import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';

const ContextMenu = ({
  setSidebarOpen,
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) => {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  // `duplicateNode` and `deleteNode` are just some example handlers
  // so I had something to put in the context menu.
  const duplicateNode = useCallback(
    (e) => {
      const node = getNode(id);
      const position = {
        x: node.position.x + 50,
        y: node.position.y + 50,
      };

      addNodes({ ...node, id: `${node.id}-copy`, position });
    },
    [id, getNode, addNodes]
  );

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute shadow-md  py-1 flex flex-col rounded-md z-20 bg-white"
      {...props}
    >
      <button
        className="flex items-center hover:bg-gray-100/80 text-purple-500 text-sm px-2 gap-3 py-1  border-gray-300"
        onClick={duplicateNode}
      >
        <HiOutlineDuplicate /> Duplicate
      </button>
      <button
        className="flex items-center hover:bg-gray-100/80 text-red-500 text-sm px-2 gap-3 py-1  border-gray-300"
        onClick={deleteNode}
      >
        <MdDelete /> Delete
      </button>
      <button
        className="flex items-center hover:bg-gray-100/80 text-blue-500 text-sm px-2 gap-3 py-1 "
        onClick={() => setSidebarOpen(true)}
      >
        <TbEdit /> Edit Node
      </button>
    </div>
  );
};

export default ContextMenu;
