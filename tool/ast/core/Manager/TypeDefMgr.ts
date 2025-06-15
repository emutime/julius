import { TypedefDecl } from "../CAstNode/TypedefDecl";

export class TypeDefMgr {
    public static instance: TypeDefMgr = new TypeDefMgr();

    private m_nodeMap: Map<string, TypedefDecl> = new Map<string, TypedefDecl>();

    public setTypedefDecl(nodeID: string, node: TypedefDecl) {
        this.m_nodeMap.set(nodeID, node);
    }

    public getTypedefDecl(nodeID: string) {
        return this.m_nodeMap.get(nodeID);
    }
}