import { SynxType } from "../SynxType";
import { ASTNode } from "./ASTNode";
import { ConstantExpr } from "./ConstantExpr";

export class EnumConstantDecl extends ASTNode {
    public m_nodeValue: ConstantExpr | undefined;
    public constructor(node: Record<string, any>) {
        super(node);
        this.m_nodeValue = this.children.find(child => child.isKind(SynxType.ConstantExpr));
    }
    public getName(): string {
        return this.name!;
    }
    public getValue(): string | undefined {
        return this.m_nodeValue?.value;
    }
}