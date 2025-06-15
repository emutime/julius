import { TypeDefMgr } from "../Manager/TypeDefMgr";
import { SynxType } from "../SynxType";
import { ASTNode } from "./ASTNode";
import { ElaboratedType } from "./ElaboratedType";


export class TypedefDecl extends ASTNode {
    public readonly elaboratedType: ElaboratedType | undefined;
    public readonly isImplicit: boolean;
    public readonly isReferenced: boolean;
    public constructor(node: Record<string, any>) {
        super(node);
        this.isImplicit = !!node["isImplicit"];
        this.isReferenced = !!node["isReferenced"];
        if (!this.isImplicit) {
            this.elaboratedType = this.children.find(child => child.isKind(SynxType.ElaboratedType)) as ElaboratedType;
            if (this.elaboratedType && this.elaboratedType.m_ownedTagDeclId) {
                TypeDefMgr.instance.setTypedefDecl(this.elaboratedType.m_ownedTagDeclId, this);
            }
        }
    }
}