import { convertAccessForArgsExpr } from "../Helper";
import { ASTNode } from "./ASTNode";

export class CallExpr extends ASTNode {
    public readonly value: string;
    public constructor(node: Record<string, any>) {
        super(node);
        this.name = node.inner[0].inner[0].referencedDecl.name;
    }
    public getText(): string {
        const text = super.getText();
        if (this.name === "memset") {
            const text = convertAccessForArgsExpr(this.children[1].getText());
            return `memset(${text}, 0)`;
        } else {
            return text;
        }
    }
}
