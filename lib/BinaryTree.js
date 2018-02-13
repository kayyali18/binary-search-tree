import Node from './Node';

export default class BinaryTree {
  constructor() {
    this.rootNode = null;
  }

  insert(val) {
    var node = new Node(val);

    if (!this.rootNode) {
      return this.rootNode = node
    }

    this.addNode(node)
  }

  addNode(node) {
    var currentNode = this.rootNode;

    while(currentNode) {
      if(node.value <= currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = node;
          currentNode = null;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = node;
          currentNode = null;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  min() {
    var currentNode = this.rootNode;

    if (!currentNode) {
      return null;
    }

    if (!currentNode.left) {
      return currentNode;
    } else {
      while(currentNode.left) {
        currentNode = currentNode.left;
      }
    }

    return currentNode.value;
  }

  max() {
    var currentNode = this.rootNode;
    if (!currentNode) {
      return null;
    }

    if (!currentNode.right) {
      return currentNode;
    } else {
      while(currentNode.right) {
        currentNode = currentNode.right;
      }
    }
    return currentNode.value;
  }

  find(val) {
    var currentNode = this.rootNode;
    var result = null;

    while (currentNode) {
      if (val === currentNode.value) {
        result = currentNode;
        currentNode = null;
      } else {
        if (val <= currentNode.value) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right
        }
      }
    }
    return result;
  }

  delete(value) {
    let nodeToDelete = this.find(value)
    let currentNode = this.rootNode;
    let deletedNode = null;
    let deletedFound = false;

    if(!nodeToDelete) {
      deletedNode = undefined;
      deletedFound = true;
    } else if (currentNode.value === value) {
      deletedNode = currentNode;
      this.rootNode = null
      deletedFound = true
    }

    while (!deletedFound) {

      if(currentNode.right && currentNode.value < value) {
        
        if(currentNode.right.value === value) {
          deletedNode = currentNode.right
          if (currentNode.right.right && !currentNode.left.left) {
            currentNode.right = currentNode.right.right;
          } else {
            currentNode.right = null;
          }
          deletedFound = true
        } else {
          currentNode = currentNode.right
        }
      } else if (currentNode.left && currentNode.value > value) {
        if(currentNode.left.value === value) {
          deletedNode = currentNode.left

          if (currentNode.left.left && !currentNode.right.right) {
            currentNode.left = currentNode.left.left;
          } else {
            currentNode.left = null;
          }
          deletedFound = true;
        } else {
          currentNode = currentNode.left
        }
      }
    }

    return deletedNode
  }
}
