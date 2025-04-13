import { NodeFactoryMgr } from "../Manager/NodeFactoryMgr";
import { ASTNode } from "./ASTNode";

export class SourceFile extends ASTNode {
    public readonly filePath: string;
    public constructor(node: Record<string, any>, filePath: string) {
        super(node);
        this.filePath = filePath;
    }
    public override genChildrenNodes(node: Record<string, any>): void {
        let currentLocFile = "";
        node["inner"]?.map((child: Record<string, any>) => {
            const childNode = NodeFactoryMgr.instance.createNode(child["kind"], child)
            if (childNode.locFile) {
                currentLocFile = childNode.locFile;
            } else {
                childNode.locFile = currentLocFile;
            }
            this.children.push(childNode);
        });
    }
}