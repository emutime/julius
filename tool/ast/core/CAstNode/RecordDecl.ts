import { SynxType } from "../SynxType";
import { ASTNode } from "./ASTNode";
import { FieldDecl } from "./FieldDecl";

export class RecordDecl extends ASTNode {
    public readonly isImplicit: boolean = false;
    public readonly fields: FieldDecl[] = [];
    public constructor(node: Record<string, any>) {
        super(node);
        this.isImplicit = node["isImplicit"];
        this.fields = this.children.filter(child => child.isKind(SynxType.FieldDecl));
    }
}