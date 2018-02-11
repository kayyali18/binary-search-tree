import { expect } from 'chai';
import BinaryTree from '../lib/index';

describe('BinaryTree', () => {
  let tree;

  beforeEach(() => {
    tree = new BinaryTree();
  });

  it('should have a rootNode node defaulted to null', () => {
    expect(tree.rootNode).to.equal(null);
  });

  describe('insert', () => {
    it('should be able to add a node to the Tree', () => {
      tree.insert(20);

      expect(tree.rootNode.value).to.equal(20);
    });

    it('should move smaller value to the left', () => {
      tree.insert(20);
      tree.insert(5);

      expect(tree.rootNode.left.value).to.equal(5);
    });

    it('should move larger value to the right', () => {
      tree.insert(20);
      tree.insert(30);

      expect(tree.rootNode.right.value).to.equal(30);
    });

    it('should add value equal to the rootNode to the left', () => {
      tree.insert(20);
      tree.insert(20);

      expect(tree.rootNode.left.value).to.equal(20);
    });

    it('should continue adding smaller value to the left down the tree', () => {
      tree.insert(20);
      tree.insert(10);
      tree.insert(5);

      expect(tree.rootNode.left.left.value).to.equal(5);
    });

    it('should continue adding larger value to the right down the tree', () => {
      tree.insert(20);
      tree.insert(30);
      tree.insert(35);
      tree.insert(32);
      tree.insert(25);

      expect(tree.rootNode.right.right.value).to.equal(35);
      expect(tree.rootNode.right.right.left.value).to.equal(32);
      expect(tree.rootNode.right.left.value).to.equal(25);
    });
  });

  describe('min and max', () => {
    it('min should return null if no nodes exist', () => {
      let tree = new BinaryTree();

      expect(tree.min()).to.equal(null);
    });

    it('max should return null if no nodes exist', () => {
      let tree = new BinaryTree();

      expect(tree.max()).to.equal(null);
    });

    beforeEach(() => {
      tree.insert(4);
      tree.insert(6);
      tree.insert(7);
      tree.insert(2);
      tree.insert(3);
      tree.insert(5);
      tree.insert(1);
    });

    it('should find the min value', () => {
      expect(tree.min()).to.equal(1);
    });

    it('should find the max value', () => {
      expect(tree.max()).to.equal(7);
    });
  });

  describe('find', () => {
    beforeEach(() => {
      tree.insert(4);
      tree.insert(6);
      tree.insert(7);
      tree.insert(2);
      tree.insert(3);
      tree.insert(5);
      tree.insert(1);
    });

    it('should return null if no match is found', () => {
      let node = tree.find(10)

      expect(node).to.equal(null);
    });

    it('should be able to find the rootNode', () => {
      let node = tree.find(4);

      expect(node).to.equal(tree.rootNode);
    });

    it('should be able to find results to the immediate left (2)', () => {
      let node = tree.find(2);

      expect(node).to.equal(tree.rootNode.left);
    });

    it('should be able to find results to the far left (1)', () => {
      let node = tree.find(1);

      expect(node).to.equal(tree.rootNode.left.left);
    });

    it('should be able to find results to the immediate right (6)', () => {
      let node = tree.find(6);

      expect(node).to.equal(tree.rootNode.right);
    });

    it('should be able to find nested results (5 and 3)', () => {
      let node = tree.find(5);

      expect(node).to.equal(tree.rootNode.right.left);
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      /*
        *        4
        *      /   \
        *     2    6
        *    / \  / \
        *   1  3 5  7
        */
      tree.insert(4);
      tree.insert(6);
      tree.insert(7);
      tree.insert(2);
      tree.insert(3);
      tree.insert(5);
      tree.insert(1);
    });

    it('should delete node with no children', () => {
      let node = tree.find(1);

      expect(tree.rootNode.left.left).to.equal(node);
      expect(tree.delete(1)).to.equal(node);
      expect(tree.rootNode.left.left).to.equal(null);
    });

    it('should delete node with one child', () => {
      let node = tree.find(1);

      expect(tree.rootNode.left.left).to.equal(node);
      expect(tree.delete(1)).to.equal(node);
      expect(tree.rootNode.left.left).to.equal(null);

      tree.insert(8);

      expect(tree.rootNode.right.right.right.value).to.equal(8);
      expect(tree.rootNode.right.right.value).to.equal(7);
      tree.delete(7);
      expect(tree.rootNode.right.right.value).to.equal(8);
      expect(tree.rootNode.right.right.right).to.equal(null);
    });

    it('should delete node with two children', () => {
      let node = tree.find(7);

      expect(tree.rootNode.right.right).to.equal(node);

      tree.delete(6);
      node = tree.find(7);
      expect(tree.rootNode.right).to.equal(node);

    });
  });
});
