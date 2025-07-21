

class Node {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new Node();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  autocompletion(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }

    let result = [];

    const dfs = (node1, current) => {

      if (node1.isEndOfWord) {
        result.push(current);
      }
      for (let c in node1.children) {
        dfs(node1.children[c], current + c);
      }
    };

    dfs(node, prefix);
    return result;
  }
}

module.exports = Trie;
