const { execFile } = require('child_process');
const path = require("path");
const tsMorph = require("ts-morph");

const { traverse } = require("./traverse");
const { getTransfromer } = require("./transformer");

// 可执行文件的路径
const executablePath = 'path/to/your/executable.exe';

// 参数列表
const args = ['-Xclang', '-ast-dump=json', '-fsyntax-only', '-I./src'];

const srcFile = "./src/building/type.h";
const dstFile = srcFile + ".ts";

args.push(srcFile);



const project = new tsMorph.Project();

// 执行可执行文件
execFile("clang", args, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }

    const ast = JSON.parse(stdout);
    const sourceFile = project.createSourceFile(dstFile, null, { overwrite: true });

    // 遍历AST
    traverse(ast,
        (node, parent) => {
            console.log('Entering node:', node.kind);
            getTransfromer(node.kind)?.(node, parent, sourceFile);
        },
        (node, parent) => {
            console.log('Leaving node:', node.kind);
        }
    );

    sourceFile.saveSync();
});