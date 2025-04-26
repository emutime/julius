import { ASTNode } from "./ASTNode";

export class VarDecl extends ASTNode {
    public readonly type: string = "";
    public readonly isPointer: boolean = false;
    public readonly storageClass: string | undefined;

    public constructor(node: Record<string, any>) {
        super(node);
        this.type = this.node["type"]["qualType"].split("(")[0].trim();
        this.isPointer = this.node["type"]["qualType"].includes("*");
        this.storageClass = this.node["storageClass"];
    }
}    