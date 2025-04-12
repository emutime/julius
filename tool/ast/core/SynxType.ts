import type { ASTNode } from "./CAstNode/ASTNode";
import type { ConstantExpr } from "./CAstNode/ConstantExpr";
import type { ElaboratedType } from "./CAstNode/ElaboratedType";
import type { EnumConstantDecl } from "./CAstNode/EnumConstantDecl";
import type { EnumDecl } from "./CAstNode/EnumDecl";

export const enum SynxType {
    Unknown = "Unknown",
    EnumDecl = "EnumDecl",
    EnumConstantDecl = "EnumConstantDecl",
    TypedefDecl = "TypedefDecl",
    ConstantExpr = "ConstantExpr",
    ElaboratedType = "ElaboratedType"
}

export type KindToNodeMappings = {
    [SynxType.Unknown]: ASTNode,
    [SynxType.EnumDecl]: EnumDecl,
    [SynxType.EnumConstantDecl]: EnumConstantDecl,
    [SynxType.TypedefDecl]: EnumConstantDecl,
    [SynxType.ConstantExpr]: ConstantExpr,
    [SynxType.ElaboratedType]: ElaboratedType
}

