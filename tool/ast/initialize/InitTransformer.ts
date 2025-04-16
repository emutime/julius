import { TransformerMgr } from "../core/Manager/TransformerMgr";
import { SynxType } from "../core/SynxType";
import { TransformerDeclStmt } from "../core/Transformers/TransformerDeclStmt";
import { TransformerEnumDecl } from "../core/Transformers/TransformerEnumDecl";
import { TransformerFunctionDecl } from "../core/Transformers/TransformerFunctionDecl";
import { TransformerIfStmt } from "../core/Transformers/TransformerIfStmt";
import { TransformerTypedefDecl } from "../core/Transformers/TransformerTypeDecl";

TransformerMgr.instance.regTransformer(SynxType.EnumDecl, new TransformerEnumDecl());
TransformerMgr.instance.regTransformer(SynxType.FunctionDecl, new TransformerFunctionDecl());
TransformerMgr.instance.regTransformer(SynxType.TypedefDecl, new TransformerTypedefDecl());
TransformerMgr.instance.regTransformer(SynxType.DeclStmt, new TransformerDeclStmt());
TransformerMgr.instance.regTransformer(SynxType.IfStmt, new TransformerIfStmt());