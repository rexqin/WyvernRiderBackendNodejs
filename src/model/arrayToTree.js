class TreeNode {
  constructor(id) {
    this.id = id;
    this.children = [];
  }
}

// class Tree
// {
//   constructor(array: TreeNode) {

//   }
// }
// 将数组数据转换为树形结构
function arrayToTree(array) {
  const nodeMap = new Map(); // 用于存储ID到节点的映射
  const roots = [];

  // 首先创建所有节点
  array.forEach(({ id }) => {
    if (!nodeMap.has(id)) {
      nodeMap.set(id, new TreeNode(id));
    }
  });

  // 建立父子关系
  array.forEach(({ id, parents }) => {
    const node = nodeMap.get(id);
    if (parents.length === 0) {
      // 没有父节点的节点作为根节点
      roots.push(node);
    } else {
      parents.forEach((parentId) => {
        const parentNode = nodeMap.get(parentId);
        if (parentNode) {
          parentNode.children.push(node);
        }
      });
    }
  });

  return roots;
}

// 将树形结构转换为数组
function treeToArray(roots) {
  const result = [];
  const visited = new Map(); // 记录节点的父节点

  function traverse(node, parentId = null) {
    if (!visited.has(node.id)) {
      visited.set(node.id, []);
    }
    if (parentId !== null) {
      visited.get(node.id).push(parentId);
    }

    node.children.forEach((child) => {
      traverse(child, node.id);
    });
  }

  roots.forEach((root) => traverse(root));

  // 转换为数组格式
  visited.forEach((parents, id) => {
    result.push({ id, parents });
  });

  return result;
}

module.exports = {
  TreeNode,
  arrayToTree,
  treeToArray,
};
