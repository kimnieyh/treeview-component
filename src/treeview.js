class VirtualTreeView {
  constructor(container, data, itemHeight = 24, options={}) {
    this.container = container;
    this.data = data;
    this.itemHeight = itemHeight;
    this.openNodes = new Set();
    this.flatList = this.flatten(data);
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight);
    this.selectedNodeId = null;
    this.onSelect = options.onSelect || null;
    this.init();
  }

  init() {
    this.container.addEventListener('scroll', () => this.render());
    this.render();
  }

  flatten(data, depth = 0, result = []) {
    data.forEach(node => {
      result.push({ ...node, depth });
      if (this.openNodes.has(node.id) && node.children) {
        this.flatten(node.children, depth + 1, result);
      }
    });
    return result;
  }

  toggle(id) {
    if (this.openNodes.has(id)) {
      this.openNodes.delete(id);
    } else {
      this.openNodes.add(id);
    }
    this.flatList = this.flatten(this.data);
    this.render();
  }

  findLeafNodes(node) {
    const result = [];
  
    function traverse(n) {
      if (!n.children || n.children.length === 0) {
        result.push(n);
      } else {
        n.children.forEach(traverse);
      }
    }
  
    traverse(node);
    return result;
  }

  findNodeById(id, nodes = this.data) {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = this.findNodeById(id, node.children);
        if (found) return found;
      }
    }
    return null;
  }
  
  findLeafNodes(node) {
    const result = [];
  
    function traverse(n) {
      if (!n.children || n.children.length === 0) {
        result.push(n);
      } else {
        n.children.forEach(traverse);
      }
    }
  
    traverse(node);
    return result;
  }

  selectNode(id) {
    if (this.selectedNodeId === id) return;

    const prev = this.container.querySelector('.selected');
    if (prev) prev.classList.remove('selected');

    this.selectedNodeId = id;

    const next = this.container.querySelector(`[data-id="${id}"]`);
    if (next) next.classList.add('selected');
    if (typeof this.onSelect === 'function') {
      const selectedNode = this.findNodeById(this.selectedNodeId);
      const leaves = this.findLeafNodes(selectedNode);
      this.onSelect(selectedNode, leaves); 
    }
  }

  render() {
    const scrollTop = this.container.scrollTop;
    const start = Math.floor(scrollTop / this.itemHeight);
    const end = start + this.visibleCount;
    const visibleItems = this.flatList.slice(start, end);

    const inner = document.createElement('div');
    inner.style.paddingTop = `${start * this.itemHeight}px`;
    inner.style.height = `${this.flatList.length * this.itemHeight}px`;

    visibleItems.forEach(item => {
      const div = document.createElement('div');
      div.style.height = `${this.itemHeight}px`;
      div.style.paddingLeft = `${item.depth * 20}px`;
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.cursor = 'pointer';
      div.innerHTML = `
        ${item.children ? `<span class="toggle">${this.openNodes.has(item.id) ? '▼' : '▶'}</span>` : '•'}
        <span>${item.label}</span>
      `;
      div.dataset.id = item.id;

      div.addEventListener('click', () => {
        this.selectNode(item.id);
      });

      if (item.id === this.selectedNodeId) {
        div.classList.add('selected');
      }

      if (item.children) {
        div.querySelector('.toggle').addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggle(item.id);
        });
      }
      inner.appendChild(div);
    });

    this.container.innerHTML = '';
    this.container.appendChild(inner);
  }
}
