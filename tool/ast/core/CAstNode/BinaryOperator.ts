import { ASTNode } from "./ASTNode";
import { ConstantExpr } from "./ConstantExpr";

export class BinaryOperator extends ASTNode {
    public readonly opcode: ConstantExpr | undefined;
    public constructor(node: Record<string, any>) {
        super(node);
        this.opcode = this.node["opcode"];
    }
}