import type { ASTNode } from "./CAstNode/ASTNode";
import { CaseStmt } from "./CAstNode/CaseStmt";
import { CompoundStmt } from "./CAstNode/CompoundStmt";
import type { ConstantExpr } from "./CAstNode/ConstantExpr";
import { DeclStmt } from "./CAstNode/DeclStmt";
import type { ElaboratedType } from "./CAstNode/ElaboratedType";
import type { EnumConstantDecl } from "./CAstNode/EnumConstantDecl";
import type { EnumDecl } from "./CAstNode/EnumDecl";
import { ForStmt } from "./CAstNode/ForStmt";
import type { FunctionDecl } from "./CAstNode/FunctionDecl";
import { IfStmt } from "./CAstNode/IfStmt";
import { IntegerLiteral } from "./CAstNode/IntegerLiteral";
import { ParmVarDecl } from "./CAstNode/ParmVarDecl";
import { SourceFile } from "./CAstNode/SourceFile";
import { SwitchStmt } from "./CAstNode/SwitchStmt";
import { TypedefDecl } from "./CAstNode/TypedefDecl";
import { VarDecl } from "./CAstNode/VarDecl";

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
    DeclStmt = "DeclStmt",
    IfStmt = "IfStmt",
    SwitchStmt = "SwitchStmt",
    CaseStmt = "CaseStmt",
    VarDecl = "VarDecl",
    IntegerLiteral = "IntegerLiteral",
    ForStmt = "ForStmt",
    SourceFile = "TranslationUnitDecl",
}

export type KindToNodeMappings = {
    [SynxType.Unknown]: ASTNode,
    [SynxType.EnumDecl]: EnumDecl,
    [SynxType.EnumConstantDecl]: EnumConstantDecl,
    [SynxType.TypedefDecl]: TypedefDecl,
    [SynxType.ConstantExpr]: ConstantExpr,
    [SynxType.ElaboratedType]: ElaboratedType
    [SynxType.FunctionDecl]: FunctionDecl,
    [SynxType.ParmVarDecl]: ParmVarDecl,
    [SynxType.CompoundStmt]: CompoundStmt,
    [SynxType.SourceFile]: SourceFile
    [SynxType.DeclStmt]: DeclStmt,
    [SynxType.IfStmt]: IfStmt,
    [SynxType.SwitchStmt]: SwitchStmt,
    [SynxType.CaseStmt]: CaseStmt,
    [SynxType.VarDecl]: VarDecl,
    [SynxType.ForStmt]: ForStmt,
    [SynxType.IntegerLiteral]: IntegerLiteral,
}

