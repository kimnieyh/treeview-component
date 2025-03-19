const data = [
    {
      id: 1,
      text: "Root",
      children: [
        {
          id: 2,
          text: "Child 1",
          children: [
            { id: 3, text: "Grandchild 1" },
            { id: 4, text: "Grandchild 2" }
          ]
        },
        {
          id: 5,
          text: "Child 2"
        }
      ]
    }
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    const treeContainer = document.getElementById('treeview');
    new TreeView(treeContainer, data);
  });
  