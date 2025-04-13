import { SynxType } from "../SynxType";
import { ASTNode } from "./ASTNode";
import { VarDecl } from "./VarDecl";

export class DeclStmt extends ASTNode {
    public varDecls: VarDecl[] = [];
    public constructor(node: Record<string, any>) {
        super(node);
        this.varDecls = this.children.filter(child => child.isKind(SynxType.VarDecl))
    }
}    