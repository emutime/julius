import { ASTNode } from "../CAstNode/ASTNode";
import { SynxType } from "../SynxType";


export class NodeFactoryMgr {
    public static instance: NodeFactoryMgr = new NodeFactoryMgr();

    private m_nodeMap: Map<string, ASTNode> = new Map<string, ASTNode>();
    private m_factory = new Map<SynxType, new (node: Record<string, any>) => ASTNode>();

    public regCreator(kind: SynxType, ctor: new (node: Record<string, any>) => ASTNode) {
        this.m_factory.set(kind, ctor);
    }

    public createNode(kind: SynxType, node: Record<string, any>, parent?: ASTNode): ASTNode {
        let astNode = this.m_nodeMap.get(node.id);
        if (astNode) {
            return astNode;
        }

        astNode = new (this.m_factory.get(kind) || ASTNode)(node);
        astNode.parent = parent;
        this.m_nodeMap.set(node.id, astNode);

        return astNode;
    }

    public getAstNode(id: string): ASTNode | undefined {
        return this.m_nodeMap.get(id);
    }
}