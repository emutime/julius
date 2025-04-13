import { TransformerMgr } from "../core/Manager/TransformerMgr";
import { SynxType } from "../core/SynxType";
import { TransformerEnumDecl } from "../core/Transformers/TransformerEnumDecl";
import { TransformerFunctionDecl } from "../core/Transformers/TransformerFunctionDecl";

TransformerMgr.instance.regTransformer(SynxType.EnumDecl, new TransformerEnumDecl());
TransformerMgr.instance.regTransformer(SynxType.FunctionDecl, new TransformerFunctionDecl());
