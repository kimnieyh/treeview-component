const data = [
  {
    id: "company-1",
    label: "테스트회사",
    data: {
      type: "회사"
    },
    children: [
      {
        id: "division-1",
        label: "연구소",
        data: {
          type: "본부"
        },
        children: [
          {
            id: "team-dev",
            label: "개발팀",
            data: {
              type: "팀"
            },
            children: [
              {
                id: "emp-1",
                label: "홍길동",
                data: {
                  title: "대리",
                  dept: "개발팀",
                  email: "hong@company.com"
                }
              },
              {
                id: "emp-2",
                label: "김개발",
                data: {
                  title: "주임",
                  dept: "개발팀",
                  email: "kimdev@company.com"
                }
              },
              {
                id: "emp-3",
                label: "박테스트",
                data: {
                  title: "사원",
                  dept: "개발팀",
                  email: "parkqa@company.com"
                }
              }
            ]
          },
          {
            id: "team-research",
            label: "연구팀",
            data: {
              type: "팀"
            },
            children: [
              {
                id: "emp-4",
                label: "이연구",
                data: {
                  title: "연구원",
                  dept: "연구팀",
                  email: "lee@company.com"
                }
              },
              {
                id: "emp-5",
                label: "정실험",
                data: {
                  title: "실험원",
                  dept: "연구팀",
                  email: "jung@company.com"
                }
              }
            ]
          }
        ]
      },
      {
        id: "division-2",
        label: "운영본부",
        data: {
          type: "본부"
        },
        children: [
          {
            id: "team-hr",
            label: "인사팀",
            data: {
              type: "팀"
            },
            children: [
              {
                id: "emp-6",
                label: "최인사",
                data: {
                  title: "사원",
                  dept: "인사팀",
                  email: "choihr@company.com"
                }
              },
              {
                id: "emp-7",
                label: "한인사",
                data: {
                  title: "주임",
                  dept: "인사팀",
                  email: "hanhr@company.com"
                }
              }
            ]
          },
          {
            id: "team-finance",
            label: "재무팀",
            data: {
              type: "팀"
            },
            children: [
              {
                id: "emp-8",
                label: "오재무",
                data: {
                  title: "과장",
                  dept: "재무팀",
                  email: "ohacc@company.com"
                }
              },
              {
                id: "emp-9",
                label: "강회계",
                data: {
                  title: "대리",
                  dept: "재무팀",
                  email: "kang@company.com"
                }
              }
            ]
          }
        ]
      }
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

  new VirtualTreeView(treeContainer, data, 24, {
    onSelect: (node, leafNodes) => {
      if (!node || !leafNodes) return;
      
      const tbody = document.getElementById('selected-users');
      tbody.innerHTML = '';

      leafNodes.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>👤</td>
          <td>${emp.label} (${emp.id})</td>
          <td>—</td>
          <td><button class="btn btn-sm btn-danger">삭제</button></td>
        `;
        tbody.appendChild(row);
      });
    }
  });
});
