const data = [
  {
    id: '1',
    text: 'Root 1',
    children: [
      { id: '1-1', text: 'Child 1-1' },
      {
        id: '1-2',
        text: 'Child 1-2',
        children: [
          { id: '1-2-1', text: 'Child 1-2-1' },
          { id: '1-2-2', text: 'Child 1-2-2' }
        ]
      }
    ]
  },
  {
    id: '2',
    text: 'Root 2',
    children: [
      { id: '2-1', text: 'Child 2-1' }
    ]
  }
];
  

function generateTree(depth = 3, breadth = 10, prefix = 'node') {
  let idCounter = 1;

  function createNode(currentDepth) {
    const node = {
      id: `${prefix}-${idCounter++}`,
      text: `Node ${idCounter}`,
    };

    if (currentDepth < depth) {
      node.children = [];
      for (let i = 0; i < breadth; i++) {
        node.children.push(createNode(currentDepth + 1));
      }
    }

    return node;
  }

  return [createNode(0)];
}

const bigData = generateTree(4, 10); // depth 4, each node has 10 children
  document.addEventListener('DOMContentLoaded', () => {
    const treeContainer = document.getElementById('treeview');
    new VirtualTreeView(treeContainer, bigData);
  });
  