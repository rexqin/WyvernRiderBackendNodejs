export class TreeNode {
  skillId: number;
  children: TreeNode[];
  name: string;
  EnName: string;
  icon: string;
  desc: string;
  scope: string;
  level: number;
  type: number;
  proficiency: number;
  category: number;

  constructor(node: ArrayNode) {
    this.skillId = node.skillId;
    this.name = node.name;
    this.EnName = node.EnName;
    this.icon = node.icon;
    this.desc = node.desc;
    this.scope = node.scope;
    this.type = node.type;
    this.level = node.level;
    this.proficiency = node.proficiency;
    this.category = node.category;

    this.children = [];
  }
}

// 定义数组数据类型
export interface ArrayNode {
  skillId: number;
  name: string;
  EnName: string;
  icon: string;
  desc: string;
  scope: string;
  level: number;
  type: number;
  proficiency: number;
  category: number;

  parentSkillId: number[];
}

class SkillTree {
  data: any;

  constructor(data: ArrayNode[] | TreeNode[]) {
    this.data = data;
  }

  isTeeNode(a: any): a is TreeNode {
    if ("children" in a) {
      return true;
    }
    return false;
  }

  isArrayNode(a: any): a is ArrayNode {
    if ("parentSkillId" in a) {
      return true;
    }
    return false;
  }

  // 将数组数据结构转换为树形结构
  arrayToTree(): TreeNode[] {
    const nodeMap: Map<number, TreeNode> = new Map(); // 用于存储ID到节点的映射
    let roots: TreeNode[] = [];

    if (this.data instanceof Array && this.data.length > 0) {
      let first = this.data[0];
      if (this.isTeeNode(first)) {
        roots = this.data;

        return roots;
      } else if (this.isArrayNode(first)) {
        const array: ArrayNode[] = <ArrayNode[]>this.data;

        // 创建所有节点
        array.forEach(
          ({
            skillId,
            name,
            EnName,
            icon,
            desc,
            scope,
            level,
            type,
            proficiency,
            category,
          }) => {
            if (!nodeMap.has(skillId)) {
              nodeMap.set(
                skillId,
                new TreeNode({
                  skillId,
                  name,
                  EnName,
                  icon,
                  desc,
                  scope,
                  level,
                  type,
                  proficiency,
                  category,
                  parentSkillId: [],
                })
              );
            }
          }
        );

        // 建立父子关系
        array.forEach(({ skillId, parentSkillId }) => {
          const node = nodeMap.get(skillId)!;
          if (
            parentSkillId.length === 0 ||
            (parentSkillId.length == 1 && parentSkillId[0] === -1)
          ) {
            // 如果没有父节点，则为根节点
            roots.push(node);
          } else {
            parentSkillId.forEach((parentId) => {
              const parentNode = nodeMap.get(parentId);
              if (parentNode) {
                parentNode.children.push(node);
              }
            });
          }
        });
        return roots;
      }
    } else {
      return roots;
    }

    return roots;
  }

  // 将树形结构转换为数组数据结构
  treeToArray(): ArrayNode[] {
    const result: ArrayNode[] = [];
    const nodeMap: Map<number, TreeNode> = new Map(); // 用于存储ID到节点的映射
    const visited: Map<number, number[]> = new Map(); // 记录节点的父节点列表

    if (this.data instanceof Array && this.data.length > 0) {
      let first = this.data[0];

      if (this.isTeeNode(first)) {
        // 深度优先遍历
        function traverse(
          node: TreeNode,
          parentId: number | null = null
        ): void {
          nodeMap.set(node.skillId, node);

          if (!visited.has(node.skillId)) {
            visited.set(node.skillId, []);
          }
          if (parentId !== null) {
            visited.get(node.skillId)!.push(parentId);
          }

          node.children.forEach((child) => {
            traverse(child, node.skillId);
          });
        }

        // 对每个根节点进行遍历
        this.data.forEach((root: TreeNode) => traverse(root));

        // 将映射的结果转换为数组格式
        // 将映射的结果转换为数组格式
        visited.forEach((parents, id) => {
          const node =
            this.data.find((root: TreeNode) => root.skillId === id) ||
            Array.from(nodeMap.values()).find((n) => n.skillId === id)!;

          result.push({
            skillId: node.id,
            name: node.name,
            EnName: node.EnName,
            icon: node.icon,
            desc: node.desc,
            scope: node.scope,
            level: node.level,
            type: node.type,
            proficiency: node.proficiency,
            category: node.category,
            parentSkillId: parents,
          });
        });

        return result;
      } else if (this.isArrayNode(first)) {
        return this.data;
      } else {
        return this.data;
      }
    }

    return result;
  }
}

export default SkillTree;
