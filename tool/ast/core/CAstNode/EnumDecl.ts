import { SynxType } from "../SynxType";
import { ASTNode } from "./ASTNode";
import { EnumConstantDecl } from "./EnumConstantDecl";

export class EnumDecl extends ASTNode {
    public readonly enumConstants: EnumConstantDecl[] = [];
    public constructor(node: Record<string, any>) {
        super(node);
        this.enumConstants = this.children.filter(child => child.isKind(SynxType.EnumConstantDecl)) || [];
        if (!this.name && this.enumConstants.length >= 2) {
            this.name = this.getCommonPrefix(this.enumConstants[0].name!, this.enumConstants[1].name!);
        }

        console.assert(this.name, "EnumDecl must have a name");
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
            word = word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join("");
    }

    public getConstants(): EnumConstantDecl[] {
        return this.enumConstants;
    }
}