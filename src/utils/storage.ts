export const saveMindMap = (nodes, edges, nodeDetails) => {
  const data = { nodes, edges, nodeDetails };
  localStorage.setItem('mindMapData', JSON.stringify(data));
};

export const loadMindMap = () => {
  const data = localStorage.getItem('mindMapData');
  return data ? JSON.parse(data) : null;
};
