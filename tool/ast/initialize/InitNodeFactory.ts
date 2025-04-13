import { ASTNode } from "../core/CAstNode/ASTNode";
import { ConstantExpr } from "../core/CAstNode/ConstantExpr";
import { ElaboratedType } from "../core/CAstNode/ElaboratedType";
import { EnumConstantDecl } from "../core/CAstNode/EnumConstantDecl";
import { EnumDecl } from "../core/CAstNode/EnumDecl";
import { TypedefDecl } from "../core/CAstNode/TypedefDecl";
import { NodeFactoryMgr } from "../core/Manager/NodeFactoryMgr";
import { SynxType } from "../core/SynxType";

NodeFactoryMgr.instance.regCreator(SynxType.Unknown, ASTNode);
NodeFactoryMgr.instance.regCreator(SynxType.EnumDecl, EnumDecl);
NodeFactoryMgr.instance.regCreator(SynxType.EnumConstantDecl, EnumConstantDecl);
NodeFactoryMgr.instance.regCreator(SynxType.TypedefDecl, TypedefDecl);
NodeFactoryMgr.instance.regCreator(SynxType.ConstantExpr, ConstantExpr);
NodeFactoryMgr.instance.regCreator(SynxType.ElaboratedType, ElaboratedType);