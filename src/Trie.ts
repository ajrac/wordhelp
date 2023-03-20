import { TrieNode } from './TrieNode';

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let currentNode = this.root;

    for (const char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }
      currentNode = currentNode.children[char];
    }

    currentNode.isEndOfWord = true;
  }

  search(searchString: string): string[] {
    let currentNode = this.root;

    for (const char of searchString) {
      if (!currentNode.children[char]) {
        return [];
      }
      currentNode = currentNode.children[char];
    }

    return this._searchNodesWithPrefix(currentNode, searchString);
  }

  searchWordsContainingSubstring(substring: string): string[] {
    const results: string[] = [];
  
    const search = (node: TrieNode, path: string) => {
      if (node.isEndOfWord && path.includes(substring)) {
        results.push(path);
      }
  
      for (const char in node.children) {
        search(node.children[char], path + char);
      }
    };
  
    search(this.root, '');
    return results;
  }

  private _searchNodesWithPrefix(node: TrieNode, prefix: string): string[] {
    if (node.isEndOfWord) {
      return [prefix];
    }

    const words = [];
    for (const char in node.children) {
      const childWords = this._searchNodesWithPrefix(
        node.children[char],
        prefix + char
      );
      words.push(...childWords);
    }
    return words;
  }

  private _searchWordsContainingSubstring(
    node: TrieNode,
    currentWord: string,
    searchString: string,
    words: string[]
  ): void {
    if (currentWord.includes(searchString)) {
      words.push(currentWord);
    }
  
    if (Object.keys(node.children).length === 0) {
      return;
    }
  
    for (const char in node.children) {
      this._searchWordsContainingSubstring(
        node.children[char],
        currentWord + char,
        searchString,
        words
      );
    }
  }
}
  