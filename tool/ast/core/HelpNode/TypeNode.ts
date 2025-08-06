import { ASTNode } from "../CAstNode/ASTNode";
import { getArrayLengthExp } from "../Helper";

const typeMap = new Map<string, string>([
    ["int", "number"],
    ["short", "number"],
    ["double", "number"],
    ["long", "bigint"],
    ["unsigned char", "number"],
    ["unsigned short", "number"],
    ["unsigned int", "number"],
    ["unsigned long", "bigint"],
    ["signed char", "number"],
    ["signed short", "number"],
    ["signed int", "number"],
    ["signed long", "bigint"],
    ["float", "number"],
    ["string", "string"],
    ["bool", "boolean"],
]);

const typeDefaultValMap = new Map<string, string>([
    ["number", "0"],
    ["bigint", "0n"],
    ["string", '""'],
    ["boolean", "false"]
]);

export class TypeNode {
    public readonly node: ASTNode;
    public readonly typeInfo: Record<string, any>;
    public readonly isPointer: boolean = false;
    public readonly isReference: boolean = false;
    public readonly isArray: boolean = false;
    public readonly isStruct: boolean = false;
    public readonly isUnion: boolean = false;
    public readonly typeDesc: string = "";
    public readonly typeRaw: string = "";
    public constructor(typeInfo: Record<string, any>, node: ASTNode) {
        this.node = node;
        this.typeInfo = typeInfo;
        this.isPointer = typeInfo["qualType"].includes("*");
        this.isReference = typeInfo["qualType"].includes("&");
        this.isArray = typeInfo["qualType"].includes("[");
        this.isStruct = typeInfo["qualType"].includes("struct");
        this.isUnion = typeInfo["qualType"].includes("union");
        let type = this.typeInfo["qualType"];
        type = type.split("*")[0].trim();
        type = type.split("&")[0].trim();
        type = type.split("const ").reverse()[0].trim();

        if (this.isArray) {
            type = type.split("[")[0].trim();
        }

        if (this.isStruct || this.isUnion) {
            if (type.includes("unnamed")) {
                const localNameParts = type.split("(")[1].split(")")[0].split(":");
                type = `unnamed${localNameParts[1]}_${localNameParts[2]}`;
            } else {
                type = type.split(this.isStruct ? "struct " : "union ")[1].trim();
            }
        }

        const mappedType = typeMap.get(type);
        if (mappedType) {
            this.typeRaw = mappedType;
        } else {
            this.typeRaw = type;
        }

        this.typeDesc = this.typeRaw + (this.isArray ? "[]" : "");
    }

    public getDefaultValue(): string {
        return typeDefaultValMap.get(this.typeRaw) || "null";
    }

    public getDefaultInitializer(): string {
        return this.isArray ? "new Array(" + this.getArrayLen() + ").fill(" + this.getDefaultValue() + ")" : this.getDefaultValue();
    }

    public getArrayLen(): string {
        return getArrayLengthExp(this.node.getText());
    }
}