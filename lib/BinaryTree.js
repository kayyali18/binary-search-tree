import Node from './Node';

export default class BinaryTree {
  constructor() {
    this.rootNode = null;
  }

  insert(value) {
    // check if the root node exists
    if (!this.rootNode) {
      // if not, make the root node a new node with the given value
      this.rootNode = new Node(value);
    } else {
      // if it does exist
      let currentNode = this.rootNode;
      let direction = this.getDirection(value, currentNode);

      while (currentNode[direction]) {
        currentNode = currentNode[direction];
        direction = this.getDirection(value, currentNode);
      }

      currentNode[direction] = new Node(value);
    }
  }

  getDirection(value, currentNode) {
    return value <= currentNode.value ?
      'left' :
      'right';
  }

  min() {
    if (!this.rootNode) {
      return null;
    }

    let currentNode = this.rootNode;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode.value;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }

    let currentNode = this.rootNode;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.value;
  }

  find(value) {
    let currentNode = this.rootNode;
    let direction = this.getDirection(value, currentNode);

    if (value === currentNode.value) {
      return currentNode;
    }

    while (currentNode[direction]) {
      currentNode = currentNode[direction];
      direction = this.getDirection(value, currentNode);
      if (value === currentNode.value) {
        return currentNode;
      }
    }

    return null;
  }

}




// console.log(JSON.stringify(this, null, 2));
