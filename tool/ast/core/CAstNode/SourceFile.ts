import * as fs from "fs";
import { NodeFactoryMgr } from "../Manager/NodeFactoryMgr";
import { ASTNode } from "./ASTNode";

export class SourceFile extends ASTNode {
    public readonly filePath: string;
    public readonly fileText: string;
    public constructor(node: Record<string, any>, filePath: string) {
        super(node);
        this.filePath = filePath;
        this.fileText = fs.readFileSync(filePath, "utf-8");
    }
    public override genChildrenNodes(node: Record<string, any>): void {
        let currentLocFile = "";
        node["inner"]?.map((child: Record<string, any>) => {
            const childNode = NodeFactoryMgr.instance.createNode(child["kind"], child, this)
            if (childNode.locFile) {
                currentLocFile = childNode.locFile;
            } else {
                childNode.locFile = currentLocFile;
            }
            this.children.push(childNode);
        });
    }
    public getSourceFileText(): string {
        return this.fileText;
    }
    public getText(): string {
        return this.fileText;
    }
}