import { SynxType } from "../SynxType";
import { ASTNode } from "./ASTNode";
import { FieldDecl } from "./FieldDecl";

export class RecordDecl extends ASTNode {
    public readonly isImplicit: boolean = false;
    public readonly fields: FieldDecl[] = [];
    public readonly tagUsed: string;
    public readonly nameLoc: string;
    public readonly nestedRecords: RecordDecl[] = [];
    public readonly nestedRecordsNames: Map<string, string> = new Map();
    public constructor(node: Record<string, any>) {
        super(node);
        this.isImplicit = !!node["isImplicit"];
        this.name = node["name"];
        this.tagUsed = node["tagUsed"];
        this.nameLoc = `unnamed${node["loc"]["line"]}_${node["loc"]["col"]}`;
        if (!this.isImplicit) {
            this.nestedRecords = this.children.filter(child => child.isKind(SynxType.RecordDecl));
            this.fields = this.children.filter(child => child.isKind(SynxType.FieldDecl));
            this.fields.forEach(field => {
                if ((field.type.isStruct || field.type.isUnion) && field.type.typeDesc?.includes("unnamed")) {
                    this.nestedRecordsNames.set(field.type.typeDesc, field.name);
                }
            });
        }
    }
}