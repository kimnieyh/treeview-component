class TreeView {
  constructor(element, data = []) {
    this.element = element;
    this.data = data;
    this.render();
  }

  render() {
    this.element.innerHTML = this.createTree(this.data);
    this.attachEvents();
  }

  createTree(data) {
    let html = '<ul class="treeview">';
    data.forEach(node => {
      html += `
        <li class="tree-node" data-id="${node.id}">
          ${node.children ? '<span class="toggle-icon">▶</span>' : '<span class="leaf-icon">•</span>'}
          ${node.text}
          ${node.children ? this.createTree(node.children) : ''}
        </li>
      `;
    });
    html += '</ul>';
    return html;
  }

  attachEvents() {
    this.element.querySelectorAll('.toggle-icon').forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.stopPropagation();

        const parent = icon.parentElement;
        parent.classList.toggle('expanded');

        icon.textContent = parent.classList.contains('expanded') ? '▼' : '▶';
      });
    });
  }
}
