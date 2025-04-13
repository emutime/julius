import { NodeFactoryMgr } from "../Manager/NodeFactoryMgr";
import { ASTNode } from "./ASTNode";


export class ElaboratedType extends ASTNode {
    public readonly m_ownedTagDeclId: string
    public constructor(node: Record<string, any>) {
        super(node);
        this.m_ownedTagDeclId = node.ownedTagDecl ? node.ownedTagDecl.id : "";
    }
    public getOwnedTagDeclNode(): ASTNode | undefined {
        return NodeFactoryMgr.instance.getAstNode(this.m_ownedTagDeclId);
    }
}