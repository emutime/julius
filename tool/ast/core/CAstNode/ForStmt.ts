import { SynxType } from "../SynxType";
import { ASTNode } from "./ASTNode";
import { CompoundStmt } from "./CompoundStmt";

export class ForStmt extends ASTNode {
    public inforStmt: ASTNode[] = [];
    public readonly compoundStmt: CompoundStmt | undefined;

    public constructor(node: Record<string, any>) {
        super(node);
        this.inforStmt = this.children.filter(child => !child.isKind(SynxType.CompoundStmt));
        this.compoundStmt = this.children.find(child => child.isKind(SynxType.CompoundStmt));
    }
}    