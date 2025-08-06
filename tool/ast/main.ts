import { execFile } from 'child_process';
import * as path from 'path';
import * as tsMorph from 'ts-morph';
import "./initialize";

import { SourceFile } from './core/CAstNode/SourceFile';
import { genDefineDeclaration } from './core/Helper';
import { SourceFileMgr } from './core/Manager/SourceFileMgr';
import { TransformerMgr } from './core/Manager/TransformerMgr';
import TransPrinter from './core/Printer/TransPrinter';
import { SynxType } from './core/SynxType';
import { traverse } from './core/Traverse';

const args = [
    '-Xclang',
    '-ast-dump=json',
    '-fsyntax-only',
    '-I./src',
    '-isystemC:/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/ucrt',
    '-isystemC:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.43.34808/include'
];

const files = [
    "./src/building/animation.c",
    "./src/building/animation.h",
    "./src/building/barracks.c",
    "./src/building/barracks.h",
    "./src/building/building.c",
    "./src/building/building.h",
    "./src/building/building_state.c",
    "./src/building/building_state.h",
    "./src/building/clone.c",
    "./src/building/clone.h",
    "./src/building/construction.c",
    "./src/building/construction.h",
    "./src/building/construction_building.c",
    "./src/building/construction_building.h",
    "./src/building/construction_clear.c",
    "./src/building/construction_clear.h",
    "./src/building/construction_routed.c",
    "./src/building/construction_routed.h",
    "./src/building/construction_warning.c",
    "./src/building/construction_warning.h",
    "./src/building/count.c",
    "./src/building/count.h",
    "./src/building/destruction.c",
    "./src/building/destruction.h",
    "./src/building/dock.c",
    "./src/building/dock.h",
    "./src/building/figure.c",
    "./src/building/figure.h",
    "./src/building/government.c",
    "./src/building/government.h",
    "./src/building/granary.c",
    "./src/building/granary.h",
    "./src/building/house.c",
    "./src/building/house.h",
    "./src/building/house_evolution.c",
    "./src/building/house_evolution.h",
    "./src/building/house_population.c",
    "./src/building/house_population.h",
    "./src/building/house_service.c",
    "./src/building/house_service.h",
    "./src/building/industry.c",
    "./src/building/industry.h",
    "./src/building/list.c",
    "./src/building/list.h",
    "./src/building/maintenance.c",
    "./src/building/maintenance.h",
    "./src/building/market.c",
    "./src/building/market.h",
    "./src/building/menu.c",
    "./src/building/menu.h",
    "./src/building/model.c",
    "./src/building/model.h",
    "./src/building/properties.c",
    "./src/building/properties.h",
    "./src/building/storage.c",
    "./src/building/storage.h",
    "./src/building/type.h",
    "./src/building/warehouse.c",
    "./src/building/warehouse.h",
];

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
        SourceFileMgr.instance.addSourceFile(sourceFile.filePath, sourceFile);
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

        const defines: Map<string, string> = new Map<string, string>();

        if (pair.source) {
            traverse(pair.source,
                (node, parent) => {
                    if (node.isKind(SynxType.IntegerLiteral)) {
                        if (node.node["range"]["begin"]["spellingLoc"] !== undefined) {
                            if (defines.has(node.getText())) {
                                return;
                            }

                            const define = genDefineDeclaration(node, tsFilePath);
                            if (!define) {
                                return;
                            }
                            defines.set(node.getText(), define);
                        }
                    }
                },
                (node, parent) => { }
            );
        }


        if (pair.source) {
            TransformerMgr.instance.transformStmts(pair.source.children, pair.source, printer);
            sourceFile.replaceWithText([...defines.values()].join("\n") + "\n" + printer.getContent());
            sourceFile.formatText();
            sourceFile.organizeImports();
            sourceFile.saveSync();
            return;
        }

        if (pair.header) {
            TransformerMgr.instance.transformStmts(pair.header.children, pair.header, printer);
            sourceFile.replaceWithText([...defines.values()].join("\n") + "\n" + printer.getContent());
            sourceFile.formatText();
            sourceFile.organizeImports();
            sourceFile.saveSync();
        }
    });
}

main();

