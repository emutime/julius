import path from "path";
import { NodeFactoryMgr } from "../Manager/NodeFactoryMgr";
import { SourceFileMgr } from "../Manager/SourceFileMgr";
import { KindToNodeMappings, SynxType } from "../SynxType";

export class ASTNode {
    public id: string = "";
    public name: string;
    public kind: SynxType = SynxType.Unknown;
    public children: ASTNode[] = [];
    public parent?: ASTNode;
    public isUsed: boolean = false;
    public locFile?: string;
    public includedFrom: boolean = false;
    public node: Record<string, any> = {};
    public constructor(node: Record<string, any>) {
        this.node = node;
        this.id = node["id"];
        this.name = node["name"] || "";
        this.kind = node["kind"];
        this.isUsed = !!node["isUsed"];
        this.locFile = node["loc"]?.["file"] ? path.resolve(node["loc"]?.["file"]) : "";
        this.includedFrom = !!node["loc"]?.["includedFrom"];
        this.genChildrenNodes(node);
    }
    public genChildrenNodes(node: Record<string, any>): void {
        node["inner"]?.map((child: Record<string, any>) => {
            this.children.push(NodeFactoryMgr.instance.createNode(child["kind"], child, this));
        });
    }
    public isKind<TKind extends SynxType>(kind: TKind): this is KindToNodeMappings[TKind] {
        return this.kind === kind;
    }
    public getLocFile(): string {
        let locFile = this.locFile;
        if (!locFile) {
            let parent = this.parent;
            while (parent && !parent.locFile) {
                parent = parent.parent;
            }
            locFile = parent?.locFile;
        }

        return locFile;
    }
    public getText(): string {
        const locFile = this.getLocFile();
        if (!locFile) {
            return "";
        }

        const sourceFile = SourceFileMgr.instance.getSourceFile(locFile);
        if (!sourceFile) {
            return "";
        }

        const sourceFileText = sourceFile.getText();
        if (this.node["range"] === undefined) {
            return "";
        }
        const begLoc = this.getTokenLoc(this.node["range"]["begin"]);
        const endLoc = this.getTokenLoc(this.node["range"]["end"]);

        return sourceFileText.substring(begLoc["offset"], endLoc["offset"] + endLoc["tokLen"]);
    }
    public getTokenLoc(node: Record<string, any>): Record<string, any> {
        if (node["expansionLoc"] !== undefined) {
            return node["expansionLoc"];
        }
        return node;
    }
}