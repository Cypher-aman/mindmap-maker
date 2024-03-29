import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { Node } from '../utils/interface';

interface ContextMenuProps {
  setSidebarOpen: (open: boolean) => void;
  onClick: () => any;
  id: string;
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  setSidebarOpen,
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) => {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    if (!node) return;
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes({ ...node, id: `${node?.id}-copy`, position } as Node);
  }, [id, getNode, addNodes]);

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
