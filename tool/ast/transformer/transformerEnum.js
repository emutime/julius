
const { registerTransfromer, getSiblingNode } = require("./transformerManager");
const { SynxType } = require("./../type");

function getCommonPrefix(str1, str2) {
    let minLength = Math.min(str1.length, str2.length);
    let commonPrefix = '';

    for (let i = 0; i < minLength; i++) {
        if (str1[i] === str2[i]) {
            commonPrefix += str1[i];
        } else {
            break;
        }
    }

    if (commonPrefix.endsWith('_')) {
        commonPrefix = commonPrefix.slice(0, -1);
    }

    return commonPrefix;
}

registerTransfromer(SynxType.EnumDecl, (node, parent, sourceFile) => {
    console.assert(node.kind === SynxType.EnumDecl);
    let name = node.name;
    if (!name) {
        const siblingNode = getSiblingNode(node, parent);
        if (siblingNode && siblingNode.kind === SynxType.TypedefDecl) {
            name = siblingNode.name
        }
    }

    const enumConstantDecl = node["inner"].filter((elem) => {
        return elem.kind === SynxType.EnumConstantDecl
    })

    if (!name && enumConstantDecl.length >= 2) {
        name = getCommonPrefix(enumConstantDecl[0].name, enumConstantDecl[1].name);
        if (name) {
            name = name.toLowerCase();
        }
    }

    console.assert(!!name);

    const enumElem = sourceFile.addEnum({
        name: name,
        isExported: true,
        isConst: true,
    })

    for (const item of enumConstantDecl) {
        enumElem.addMember({
            name: item.name,
            initializer: item["inner"] ? item["inner"][0].value : undefined
        });
    }
})