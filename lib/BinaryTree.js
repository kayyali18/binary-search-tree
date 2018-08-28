import Node from './Node';

export default class BinaryTree {
  constructor() {
    // Initialize your Binary Tree here!
    this.rootNode = null;
  }

  // Functions Go Here!

  insert (value) {
    let currNode = this.rootNode;
    if (!this.rootNode) {
      this.rootNode = new Node (null, null, value)
    }
    if (value < currNode.value) {
      currNode.left = new Node(null, null, value)
    }
  }

}

/*find () 
  start at root 
  is this the #
  compare
  Check for children
  move based on value

  */