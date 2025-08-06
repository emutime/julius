
import { TypeNode } from "../HelpNode/TypeNode";
import { ASTNode } from "./ASTNode";

export class VarDecl extends ASTNode {
    public readonly type: TypeNode;
    public readonly storageClass: string | undefined;

    public constructor(node: Record<string, any>) {
        super(node);
        this.type = new TypeNode(this.node["type"], this); //this.node["type"]["qualType"].split("(")[0].trim();
        this.storageClass = this.node["storageClass"];
    }
}    