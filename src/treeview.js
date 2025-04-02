class VirtualTreeView {
  constructor(container, data, itemHeight = 24) {
    this.container = container;
    this.data = data;
    this.itemHeight = itemHeight;
    this.openNodes = new Set();
    this.flatList = this.flatten(data);
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight);

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
        <span>${item.text}</span>
      `;
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
