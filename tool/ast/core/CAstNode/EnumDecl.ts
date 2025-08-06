import { TypeDefMgr } from "../Manager/TypeDefMgr";
import { SynxType } from "../SynxType";
import { ASTNode } from "./ASTNode";
import { EnumConstantDecl } from "./EnumConstantDecl";

export class EnumDecl extends ASTNode {
    public nameFromConstants: string | undefined;
    public readonly enumConstants: EnumConstantDecl[] = [];
    public constructor(node: Record<string, any>) {
        super(node);
        this.enumConstants = this.children.filter(child => child.isKind(SynxType.EnumConstantDecl)) || [];
        if (!this.name) {
            if (this.enumConstants.length >= 2) {
                this.nameFromConstants = this.getCommonKeyWords(this.enumConstants[0].name!, this.enumConstants[1].name!);
            } else if (this.enumConstants.length === 1) {
                this.nameFromConstants = this.getFirstWordPrefix(this.enumConstants[0].name!);
            }
        }
    }

    public getDescName(): string {
        if (this.name) {
            return this.name;
        }

        const nameFromTypedef = TypeDefMgr.instance.getTypedefDecl(this.node.id)?.name;
        if (nameFromTypedef) {
            return nameFromTypedef;
        }

        if (this.nameFromConstants) {
            return this.nameFromConstants;
        }

        console.assert(this.name, "EnumDecl must have a name");
    }

    private getCommonKeyWords(str1: string, str2: string) {
        return this.getCommonPrefix(str1, str2) || this.getCommonSuffix(str1, str2);
    }

    private getCommonPrefix(str1: string, str2: string) {
        let minLength = Math.min(str1.length, str2.length);
        let commonPrefixArr: string[] = [];

        for (let i = 0; i < minLength; i++) {
            if (str1[i] === str2[i]) {
                commonPrefixArr.push(str1[i]);
            } else {
                break;
            }
        }

        if (commonPrefixArr.length > 0 && commonPrefixArr[commonPrefixArr.length - 1] === '_') {
            commonPrefixArr.pop();
        }

        return commonPrefixArr.join("").split("_").map(word => {
            return word.toLowerCase();
        }).join("_");
    }

    private getCommonSuffix(str1: string, str2: string) {
        let minLength = Math.min(str1.length, str2.length);
        let commonSuffixArr: string[] = [];

        for (let i = 1; i <= minLength; i++) {
            if (str1[str1.length - i] === str2[str2.length - i]) {
                commonSuffixArr.push(str1[str1.length - i]);
            } else {
                break;
            }
        }

        if (commonSuffixArr.length > 0 && commonSuffixArr[commonSuffixArr.length - 1] === '_') {
            commonSuffixArr.pop();
        }

        return commonSuffixArr.reverse().join("").split("_").map(word => {
            return word.toLowerCase();
        }).join("_");
    }

    private getFirstWordPrefix(str: string) {
        const words = str.split("_");
        if (words.length == 1) {
            return words[0];
        } else {
            words.pop();
            return words.join("_");
        }
    }

    public getConstants(): EnumConstantDecl[] {
        return this.enumConstants;
    }
}