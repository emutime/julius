import path from "path";
import { NodeFactoryMgr } from "../Manager/NodeFactoryMgr";
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
    public getSourceFileText(): string {
        let parent = this.parent;
        while (parent && !parent.isKind(SynxType.SourceFile)) {
            parent = parent.parent;
        }

        return parent?.getSourceFileText() || "";
    }
    public getText(): string {
        const sourceFileText = this.getSourceFileText();
        if (this.node["range"] === undefined) {
            return "";
        }
        const begin = this.node["range"]["begin"]["offset"];
        const end = this.node["range"]["end"]["offset"] + this.node["range"]["end"]["tokLen"];
        return sourceFileText.substring(begin, end);
    }
}