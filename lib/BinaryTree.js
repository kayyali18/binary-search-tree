import Node from './Node';

export default class BinaryTree {
  constructor() {
    this.rootNode = null;
  }

  insert(val) {
    let node = new Node(val);

    // if there is currently no rootNode (e.g. we have an empty tree)
    // insert the new Node as our root, otherwise call an addNode()
    // method that will figure out where to place it
    if (!this.rootNode) {
      return this.rootNode = node;
    }

    this.addNode(node);
  }

  addNode(node) {
    // keep track of our currentNode, which is the one we're currently on
    // as we traverse the tree. We start with the rootNode
    let currentNode = this.rootNode;

    // While we still have a currentNode to traverse, e.g. it's not null
    while (currentNode) {
      // Check if the node value we want to add is less than or equal to the currentNode
      if (node.value <= currentNode.value) {
        // if there isn't currently a left child node, insert it here, and end our traversal
        if (!currentNode.left) {
          currentNode.left = node;
          currentNode = null;
        } else {
          // otherwise, move ourselves down a branch to the left
          currentNode = currentNode.left;
        }
      }

      // if the node value we want to add is greater than the current Node
      else {
        // and there is no right child node, insert it here and end our traversal
        if (!currentNode.right) {
          currentNode.right = node;
          currentNode = null;
        } else {
          // otherwise, move ourselves down a branch to the right
          currentNode = currentNode.right;
        }
      }
    }
  }


  min() {
    // Again, start our traversal at the root node
    let currentNode = this.rootNode;

    // if the tree is empty, return null because there is no min
    if (!currentNode) {
      return null;
    }

    // if there is no node to the left, we can assume that the node we're currently
    // on is the minimum
    if (!currentNode.left) {
      return currentNode;
    } else {
      // otherwise, keep traversing down the left side of the tree
      while (currentNode.left) {
        currentNode = currentNode.left;
      }
    }

    // return the value of the currentNode
    return currentNode.value;
  }

  max() {
    // Again, start our traversal at the root node
    let currentNode = this.rootNode;

    // if there is no node to the right, we can assume that the node we're currently
    // on is the maximum
    if (!currentNode) {
      return null;
    }

    // if there is no node to the right, we can assume that the node we're currently
    // on is the maximum
    if (!currentNode.right) {
      return currentNode;
    } else {
      // otherwise, keep traversing down the right side of the tree
      while (currentNode.right) {
        currentNode = currentNode.right;
      }
    }

    // return the value of the currentNode
    return currentNode.value;
  }

  find(val) {
    // Again, start our traversal at the root node
    // Set an initial result to null, because we might never find what we're looking for
    let currentNode = this.rootNode;
    let result = null;

    while (currentNode) {

      // if the currentNode value equals what we're looking for
      if (currentNode.value === val) {
        // set the result equal to the current node and end our while loop
        result = currentNode;
        currentNode = null;
      } else {
        // otherwise, check if the currentNode value is greater than or equal to the value
        // we're looking for - if it is, traverse down the left side of the tree
        if (currentNode.value >= val) {
          currentNode = currentNode.left;
        } else {
          // otherwise, traverse down the right side of the tree
          currentNode = currentNode.right;
        }
      }
    }

    return result;
  }

  delete(val) {
    let nodeToDelete = this.find(val)
    let currentNode = this.rootNode;
    let deletedNode = null;
    let deletedFound = false;

    if (!nodeToDelete) {
      deletedNode = undefined;
      deletedFound = true;
    } else if (currentNode.value === val) {
      deletedNode = currentNode;
      this.rootNode = null
      deletedFound = true
    }

    while (!deletedFound) {

      if (currentNode.right && currentNode.value < val) {
        
        if (currentNode.right.value === val) {
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
      } else if (currentNode.left && currentNode.value > val) {
        if(currentNode.left.value === val) {
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
