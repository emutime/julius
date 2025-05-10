import { TypeNode } from "../HelpNode/TypeNode";
import { ASTNode } from "./ASTNode";

export class FieldDecl extends ASTNode {
    public readonly type: TypeNode;
    public constructor(node: Record<string, any>) {
        super(node);
        this.type = new TypeNode(this.node["type"]);
    }
}