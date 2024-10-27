const traverseType = {

}

function traverse(node, enter, leave, parent = null) {
    if (enter) {
        enter(node, parent);
    }

    if (node["inner"]) {
        for (const inner of node["inner"]) {
            traverse(inner, enter, leave, node);
        }
    }

    if (leave) {
        leave(node, parent);
    }
}

module.exports = { traverse };