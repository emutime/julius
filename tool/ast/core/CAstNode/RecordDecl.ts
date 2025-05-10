import { SynxType } from "../SynxType";
import { ASTNode } from "./ASTNode";
import { FieldDecl } from "./FieldDecl";

export class RecordDecl extends ASTNode {
    public readonly isImplicit: boolean = false;
    public readonly fields: FieldDecl[] = [];
    public readonly tagUsed: string;
    public readonly nestedRecords: RecordDecl[] = [];
    public constructor(node: Record<string, any>) {
        super(node);
        this.isImplicit = !!node["isImplicit"];
        this.tagUsed = node["tagUsed"];
        this.name = node["name"] || `unnamed${node["loc"]["line"]}_${node["loc"]["col"]}`;
        if (!this.isImplicit) {
            this.nestedRecords = this.children.filter(child => child.isKind(SynxType.RecordDecl));
            this.fields = this.children.filter(child => child.isKind(SynxType.FieldDecl));
        }
    }
}