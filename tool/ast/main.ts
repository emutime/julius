import { execFileSync } from 'child_process';
import * as path from 'path';
import * as tsMorph from 'ts-morph';
import "./initlalize";

import { SourceFile } from './core/CAstNode/SourceFile';
import { TransformerMgr } from './core/Manager/TransformerMgr';

const args = ['-Xclang', '-ast-dump=json', '-fsyntax-only', '-I./src'];

const files = ["./src/building/type.h"];
const sourceFiles = files.map(filePath => {
    const stdout = execFileSync("clang", [...args, filePath], { encoding: 'utf8' });
    const ast = JSON.parse(stdout);

    return new SourceFile(ast, path.resolve(process.cwd(), filePath));
});

const sourceFilesPair = new Map<string, { header?: SourceFile, source?: SourceFile }>();

sourceFiles.forEach(sourceFile => {
    const extname = path.extname(sourceFile.filePath);
    const baseName = path.basename(sourceFile.filePath, extname);
    const dirname = path.dirname(sourceFile.filePath);
    const filePathKey = path.resolve(dirname, baseName);

    let filePathValue = sourceFilesPair.get(filePathKey);
    if (!filePathValue) {
        filePathValue = { header: undefined, source: undefined };
        sourceFilesPair.set(filePathKey, filePathValue);
    }
    if (extname === ".h") {
        filePathValue.header = sourceFile;
    } else if (extname === ".c") {
        filePathValue.source = sourceFile;
    };
});

const project = new tsMorph.Project();

sourceFilesPair.forEach((pair, key) => {
    const tsFilePath = `${key}.ts`;
    const sourceFile = project.createSourceFile(tsFilePath, undefined, { overwrite: true });

    pair.header && TransformerMgr.instance.transform(pair.header, sourceFile);
    pair.source && TransformerMgr.instance.transform(pair.source, sourceFile);

    sourceFile.saveSync();
});

