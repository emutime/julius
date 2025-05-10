const typeMap = new Map<string, string>([
    ["int", "number"],
    ["double", "number"],
    ["long", "bigint"],
    ["unsigned int", "number"],
    ["unsigned long", "bigint"],
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
    public readonly typeInfo: Record<string, any>;
    public readonly isPointer: boolean = false;
    public readonly isReference: boolean = false;
    public readonly isArray: boolean = false;
    public readonly isStruct: boolean = false;
    public readonly typeDesc: string = "";
    public readonly typeRaw: string = "";
    public constructor(typeInfo: Record<string, any>) {
        this.typeInfo = typeInfo;
        this.isPointer = typeInfo["qualType"].includes("*");
        this.isReference = typeInfo["qualType"].includes("&");
        this.isArray = typeInfo["qualType"].includes("[");
        this.isStruct = typeInfo["qualType"].includes("struct");

        let type = this.typeInfo["qualType"];
        type = type.split("*")[0].trim();
        type = type.split("&")[0].trim();
        type = type.split("const").reverse()[0].trim();

        if (this.isArray) {
            type = type.split("[")[0].trim();
        }

        if (this.isStruct) {
            if (type.includes("unnamed")) {
                const localNameParts = type.split("(")[1].split(")")[0].split(":");
                type = `unnamed${localNameParts[1]}_${localNameParts[2]}`;
            } else {
                type = type.split("struct")[1].trim();
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
        const defaultVal = typeDefaultValMap.get(this.typeRaw);
        if (defaultVal) {
            return defaultVal;
        }

        return "null";
    }
}