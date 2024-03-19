import { Handle, Position, NodeProps } from 'reactflow';

// const handleStyle = { left: 10 };

function CustomNode({ isConnectable, data }: NodeProps) {
  //   const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(evt.target.value);
  //   }, []);

  return (
    <>
      <div className="">
        <h1>{data.label}</h1>
        <Handle
          type="target"
          position={Position.Left}
          id="a"
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}
//  <Handle
//    type="source"
//    position={Position.Bottom}
//    id="a"
//    style={handleStyle}
//    isConnectable={isConnectable}
//  />;
export default CustomNode;
