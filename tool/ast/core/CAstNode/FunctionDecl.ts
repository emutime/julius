import { TypeNode } from "../HelpNode/TypeNode";
import { SynxType } from "../SynxType";
import { ASTNode } from "./ASTNode";
import { CompoundStmt } from "./CompoundStmt";
import { ParmVarDecl } from "./ParmVarDecl";
export class FunctionDecl extends ASTNode {
    public readonly returnType: TypeNode;
    public readonly parmVarDecl: ParmVarDecl[] = [];
    public readonly compoundStmt: CompoundStmt | undefined;
    public readonly storageClass: string | undefined;
    public constructor(node: Record<string, any>) {
        super(node);
        this.storageClass = this.node["storageClass"];
        this.returnType = new TypeNode(this.node["type"], this);
        this.parmVarDecl = this.children.filter(child => child.isKind(SynxType.ParmVarDecl));
        this.compoundStmt = this.children.find(child => child.isKind(SynxType.CompoundStmt));
    }

    public getReturnType(): TypeNode {
        return this.returnType;
    }

    public getParmVarDecl(): ParmVarDecl[] {
        return this.parmVarDecl;
    }

    public getCompoundStmt(): CompoundStmt | undefined {
        return this.compoundStmt;
    }
}    