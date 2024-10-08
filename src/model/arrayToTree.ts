class TreeNode {
  id: number;
  children: TreeNode[];

  constructor(id: number) {
    this.id = id;
    this.children = [];
  }
}

// 定义数组数据类型
interface ArrayNode {
  id: number;
  parents: number[];
}

class Tree {
  data: any;

  constructor(data: ArrayNode[] | TreeNode[]) {
    this.data = data;
  }

  // 将数组数据结构转换为树形结构
  arrayToTree(): TreeNode[] {
    const nodeMap: Map<number, TreeNode> = new Map(); // 用于存储ID到节点的映射
    let roots: TreeNode[] = [];

    if (this.data instanceof Object) {
      roots = <TreeNode[]>this.data;
      return roots;
    } else if (this.data instanceof Array) {
      const array: ArrayNode[] = <ArrayNode[]>this.data;

      // 创建所有节点
      array.forEach(({ id }) => {
        if (!nodeMap.has(id)) {
          nodeMap.set(id, new TreeNode(id));
        }
      });

      // 建立父子关系
      array.forEach(({ id, parents }) => {
        const node = nodeMap.get(id)!;
        if (parents.length === 0) {
          // 如果没有父节点，则为根节点
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

    return roots;
  }

  // 将树形结构转换为数组数据结构
  treeToArray(): ArrayNode[] {
    const result: ArrayNode[] = [];
    const visited: Map<number, number[]> = new Map(); // 记录节点的父节点列表

    if (this.data instanceof Array) {
      return this.data;
    } else if (this.data instanceof Object) {
      // 深度优先遍历
      function traverse(node: TreeNode, parentId: number | null = null): void {
        if (!visited.has(node.id)) {
          visited.set(node.id, []);
        }
        if (parentId !== null) {
          visited.get(node.id)!.push(parentId);
        }

        node.children.forEach((child) => {
          traverse(child, node.id);
        });
      }

      // 对每个根节点进行遍历
      this.data.forEach((root: TreeNode) => traverse(root));

      // 将映射的结果转换为数组格式
      visited.forEach((parents, id) => {
        result.push({ id, parents });
      });
    }

    return result;
  }
}
