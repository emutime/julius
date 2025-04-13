
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

    const mappedType = typeMap.get(type);
    if (mappedType) {
        return mappedType;
    }
    console.log(`Unknown type to map: ${type}`);
    return type;
}

export function convertStatement(statement: string): string {
    statement = statement.replace(/->/g, ".");
    return statement;
}