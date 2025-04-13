import { ASTNode } from "./ASTNode";

export class ParmVarDecl extends ASTNode {
    public readonly type: string = "";
    public constructor(node: Record<string, any>) {
        super(node);
        this.type = this.node["type"]["qualType"].split("(")[0].trim();
    }
}    