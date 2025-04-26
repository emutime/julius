import path from "path";
import { IntegerLiteral } from "./CAstNode/IntegerLiteral";

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

export function convertType(type: string): string {
    type = type.split("*")[0].trim();
    type = type.split("const").reverse()[0].trim();

    const mappedType = typeMap.get(type);
    if (mappedType) {
        return mappedType;
    }
    console.log(`Unknown type to map: ${type}`);
    return type;
}

export function getPathWithoutExt(filePath: string): string {
    return filePath.substring(0, filePath.length - path.extname(filePath).length);
}

export function convertAccess(statement: string): string {
    statement = statement.replace(/->/g, ".");
    statement = statement.replace(/&([\w]+)/g, "$1");
    return statement;
}

export function genDefineDeclaration(node: IntegerLiteral, currentFile: string): string {
    if (node.node["range"]["begin"]["spellingLoc"] === undefined) {
        return "";
    }

    const baseDir = path.resolve(process.cwd() + '\\src');
    const locFile = node.node["range"]["begin"]["spellingLoc"]["file"];

    if (locFile && path.isAbsolute(locFile) && !locFile.startsWith(baseDir)) {
        throw new Error("Invalid file path: " + locFile);
    }

    if (!locFile) {
        // 生成变量定义
        return `export const ${node.getText()} = ${node.node["value"]};`;
    } else {
        // 生成import
        let removedExt = getPathWithoutExt(locFile);
        let importPath = path.relative(baseDir, removedExt).replace(/\\/g, '/');
        return `import { ${node.getText()} } from '${importPath}';`;
    }
}