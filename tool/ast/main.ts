import { execFile } from 'child_process';
import * as path from 'path';
import * as tsMorph from 'ts-morph';
import "./initialize";

import { SourceFile } from './core/CAstNode/SourceFile';
import { TransformerMgr } from './core/Manager/TransformerMgr';
import TransPrinter from './core/Printer/TransPrinter';

const args = ['-Xclang', '-ast-dump=json', '-fsyntax-only', '-I./src'];

const files = ["./src/building/barracks.c", "./src/building/barracks.h"];

function clangParseAst(args: string[]) {
    return new Promise<string>((resolve, reject) => {
        execFile("clang", args, { encoding: 'utf8', maxBuffer: 1024 * 1024 * 1024 }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else if (stderr) {
                reject(new Error(stderr));
            } else {
                resolve(stdout);
            }
        });
    });
}

function parseAllFiles() {
    return Promise.all(files.map(async filePath => {
        const stdout = await clangParseAst([...args, filePath]);
        const ast = JSON.parse(stdout);
        return new SourceFile(ast, path.resolve(process.cwd(), filePath));
    }));
}

async function main() {
    const sourceFiles = await parseAllFiles();
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
        const printer = new TransPrinter();

        if (pair.source) {
            TransformerMgr.instance.transform(pair.source, printer);
            sourceFile.replaceWithText(printer.getContent());
            sourceFile.formatText();
            sourceFile.saveSync();
            return;
        }

        if (pair.header) {
            TransformerMgr.instance.transform(pair.header, printer);
            sourceFile.replaceWithText(printer.getContent());
            sourceFile.formatText();
            sourceFile.saveSync();
        }
    });
}

main();

