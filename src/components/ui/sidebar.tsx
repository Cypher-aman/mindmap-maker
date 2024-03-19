import React, { useContext, useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { ReactFlowElContext } from '../../providers/ReactFlowEl';
import { findColorName, findHexCode } from '../../utils/helper';
import { Node, NodeDetails } from '../../utils/interface';

const Sidebar = ({ open, setOpen, nodeId }: any) => {
  const { nodeDetails, setNodeDetails, nodes, setNodes } =
    useContext<any>(ReactFlowElContext);
  const initialNode = nodeId && nodes.find((n: Node) => n.id === nodeId);
  const initialColor =
    initialNode && findColorName(initialNode.style.backgroundColor);
  const [color, setColor] = useState(initialColor);
  const [node, setNode] = useState<Node>();
  const [nodeDetail, setNodeDetail] = useState<NodeDetails>();

  useEffect(() => {
    if (initialNode) {
      setNode(initialNode);
      setNodeDetail(
        nodeDetails.find((n: NodeDetails) => n.nodeId === initialNode.id)
      );
      setColor(findColorName(initialNode.style.backgroundColor));
    }
  }, [initialNode, nodeDetails]);
  const onInputChange = (e: any) => {
    if (!node) return;
    setNode({ ...node, data: { ...node.data, label: e.target.value } });
  };

  const onTextAreaChange = (e: any) => {
    if (!nodeDetail) return;
    setNodeDetail({ ...nodeDetail, data: e.target.value });
  };

  const onColorChange = (key: string) => {
    if (!node) return;
    setColor(key);
    setNode({
      ...node,
      style: { ...node.style, backgroundColor: findHexCode(key) },
    });
  };

  const onSave = () => {
    setNodeDetails(
      nodeDetails.map((n: NodeDetails) =>
        n.nodeId === node?.id ? nodeDetail : n
      )
    );
    setNodes(nodes.map((n: Node) => (n.id === node?.id ? node : n)));
    setOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 w-screen ease-linear left-0 bottom-0 transition-all duration-300 z-30 bg-black/50 ${
          open ? ' translate-x-0 ' : ' translate-x-full '
        }`}
      ></div>
      <div
        className={`fixed top-0 z-40 shadow-lg right-0 w-[400px] bottom-0 bg-white transition-all duration-300 p-5 max-w-[90%]   ${
          open ? ' translate-x-0 delay-300' : ' translate-x-full delay-0 '
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="border p-1 rounded-md border-black hover:shadow-md"
        >
          <CgClose />
        </button>
        <div className="flex my-8 flex-col gap-5">
          <div className="flex gap-3 items-center">
            <p className="text-gray-800">Change Color - </p>
            <div className="flex gap-3">
              <button
                onClick={() => onColorChange('red')}
                className={`h-5 w-5 border-[1px] border-black rounded bg-red-500 ${
                  color === 'red'
                    ? 'outline outline-2 outline-offset-2 outline-black'
                    : ''
                }`}
              ></button>
              <button
                onClick={() => onColorChange('blue')}
                className={`h-5 w-5 border-[1px] border-black rounded  bg-blue-500 ${
                  color === 'blue'
                    ? 'outline outline-2 outline-offset-2 outline-black'
                    : ''
                }`}
              ></button>
              <button
                onClick={() => onColorChange('green')}
                className={`h-5 w-5 border-[1px] border-black rounded bg-green-500 ${
                  color === 'green'
                    ? 'outline outline-2 outline-offset-2 outline-black'
                    : ''
                }`}
              ></button>
              <button
                onClick={() => onColorChange('orange')}
                className={`h-5 w-5 border-[1px] border-black rounded bg-orange-500 ${
                  color === 'orange'
                    ? 'outline outline-2 outline-offset-2 outline-black'
                    : ''
                }`}
              ></button>
              <button
                onClick={() => onColorChange('purple')}
                className={`h-5 w-5 border-[1px] border-black rounded bg-purple-500 ${
                  color === 'purple'
                    ? 'outline outline-2 outline-offset-2 outline-black'
                    : ''
                }`}
              ></button>
            </div>
          </div>
          <div>
            <label htmlFor="text" className="block  text-gray-800">
              Title:
            </label>
            <input
              type="text"
              value={node && node.data.label}
              onChange={(e) => onInputChange(e)}
              name="text"
              id="text"
              className="block w-full rounded-md p-2 bg-gray-100 focus:outline-blue-500 "
            />
          </div>
          <div>
            <label className="block text-gray-700 ">Details:</label>
            <textarea
              name="text"
              id="text"
              value={nodeDetail && nodeDetail.data}
              onChange={(e) => onTextAreaChange(e)}
              cols={30}
              rows={10}
              className="block w-full rounded-md px-2 py-1 bg-gray-100 focus:outline-blue-500 resize-none"
            ></textarea>
          </div>

          <button
            onClick={onSave}
            className="bg-blue-500 self-end w-max px-5 bg-gradient-to-r from-purple-500 to-blue-600 rounded text-white p-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Sidebar);
