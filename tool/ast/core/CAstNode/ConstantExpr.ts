import { ASTNode } from "./ASTNode";

export class ConstantExpr extends ASTNode {
    public readonly value: string;
    public constructor(node: Record<string, any>) {
        super(node);
        this.value = this.parseValue();
    }
    private parseValue(): string {
        if (this.node["type"]["qualType"] === "string") {
            return `\"${this.node["value"]}\"`;
        }

        return this.node["value"];
    }
}