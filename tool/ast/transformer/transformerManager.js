
const transformers = new Map();

function registerTransfromer(kind, fun) {
    transformers.set(kind, fun);
}

function getTransfromer(kind) {
    return transformers.get(kind);
}

function getSiblingNode(node, parent) {
    const idx = parent["inner"].indexOf(node);
    if (idx == -1) {
        return undefined;
    }

    return parent["inner"][idx + 1];
}


module.exports = { getTransfromer, getSiblingNode, registerTransfromer };