import type { ASTNode } from "./CAstNode/ASTNode";
import { CompoundStmt } from "./CAstNode/CompoundStmt";
import type { ConstantExpr } from "./CAstNode/ConstantExpr";
import type { ElaboratedType } from "./CAstNode/ElaboratedType";
import type { EnumConstantDecl } from "./CAstNode/EnumConstantDecl";
import type { EnumDecl } from "./CAstNode/EnumDecl";
import type { FunctionDecl } from "./CAstNode/FunctionDecl";
import { ParmVarDecl } from "./CAstNode/ParmVarDecl";

export const enum SynxType {
    Unknown = "Unknown",
    EnumDecl = "EnumDecl",
    EnumConstantDecl = "EnumConstantDecl",
    TypedefDecl = "TypedefDecl",
    ConstantExpr = "ConstantExpr",
    ElaboratedType = "ElaboratedType",
    FunctionDecl = "FunctionDecl",
    ParmVarDecl = "ParmVarDecl",
    CompoundStmt = "CompoundStmt",
}

export type KindToNodeMappings = {
    [SynxType.Unknown]: ASTNode,
    [SynxType.EnumDecl]: EnumDecl,
    [SynxType.EnumConstantDecl]: EnumConstantDecl,
    [SynxType.TypedefDecl]: EnumConstantDecl,
    [SynxType.ConstantExpr]: ConstantExpr,
    [SynxType.ElaboratedType]: ElaboratedType
    [SynxType.FunctionDecl]: FunctionDecl,
    [SynxType.ParmVarDecl]: ParmVarDecl,
    [SynxType.CompoundStmt]: CompoundStmt,
}

