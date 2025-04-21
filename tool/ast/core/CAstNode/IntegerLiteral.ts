import { ASTNode } from "./ASTNode";

export class IntegerLiteral extends ASTNode {
    public body: ASTNode[] = [];
    public constructor(node: Record<string, any>) {
        super(node);
        this.body = this.children;
    }
    public getText(): string {
        const expansionLoc = this.node["range"]["begin"]["expansionLoc"];
        if (expansionLoc === undefined) {
            return super.getText();
        }

        const sourceFileText = this.getSourceFileText();
        if (this.node["range"] === undefined) {
            return "";
        }
        const begin = expansionLoc["offset"];
        const end = expansionLoc["offset"] + expansionLoc["tokLen"];
        return sourceFileText.substring(begin, end);
    }
}    