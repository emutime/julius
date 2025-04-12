import { ASTNode } from "./CAstNode/ASTNode";

export function traverse(node: ASTNode, enter: (node: ASTNode, parent: ASTNode | undefined) => void, leave: (node: ASTNode, parent: ASTNode | undefined) => void, parent: ASTNode | undefined = undefined) {
    if (enter) {
        enter(node, parent);
    }

    for (const inner of node.children) {
        traverse(inner, enter, leave, node);
    }

    if (leave) {
        leave(node, parent);
    }
}

export function getSiblingNode(node: ASTNode, parent: ASTNode | undefined): ASTNode | undefined {
    if (!parent || parent.children.length == 0) {
        return undefined;
    }

    const idx = parent.children.indexOf(node);
    if (idx === -1) {
        return undefined;
    }
    return parent.children[idx + 1];
}