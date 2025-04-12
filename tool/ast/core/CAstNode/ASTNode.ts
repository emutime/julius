import { NodeFactoryMgr } from "../Manager/NodeFactoryMgr";
import { KindToNodeMappings, SynxType } from "../SynxType";
export class ASTNode {
    public id: string = "";
    public name?: string;
    public kind: SynxType = SynxType.Unknown;
    public children: ASTNode[] = [];
    public parent?: ASTNode;
    public node: Record<string, any> = {};
    public constructor(node: Record<string, any>) {
        this.node = node;
        this.id = node["id"];
        this.name = node["name"];
        this.kind = node["kind"];
        node["inner"]?.map((child: Record<string, any>) => {
            this.children.push(NodeFactoryMgr.instance.createNode(child["kind"], child));
        });
    }
    public isKind<TKind extends SynxType>(kind: TKind): this is KindToNodeMappings[TKind] {
        return this.kind === kind;
    }
}