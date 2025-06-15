import path from 'path';
import { ASTNode } from '../CAstNode/ASTNode';
import { RecordDecl } from '../CAstNode/RecordDecl';
import type { SourceFile } from '../CAstNode/SourceFile';
import { getTSFilePath } from '../Helper';
import { TypeDefMgr } from '../Manager/TypeDefMgr';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from "../SynxType";
import { TransformerBase } from './TransformerBase';

export class TransformerRecordDecl extends TransformerBase {
    public override transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter) {
        if (!node.isKind(SynxType.RecordDecl)) {
            return;
        }

        if (node.isImplicit) {
            return;
        }

        if (node.includedFrom) {
            const baseDir = path.resolve(process.cwd() + '\\src');
            if (!node.locFile) {
                return;
            }

            if (!node.locFile.startsWith(baseDir)) {
                return;
            }

            if (getTSFilePath(node.locFile) !== getTSFilePath(sourceFile.filePath)) {
                // generate code for import record decls
                return;
            }
        }

        this.transformInners(node, sourceFile, undefined, printer);
    }

    private transformInners(node: RecordDecl, sourceFile: SourceFile, nestedFromRecordDecl: RecordDecl, printer: TransPrinter) {
        node.nestedRecords.forEach(recordDecl => this.transformInners(recordDecl, sourceFile, node, printer));

        const className = node.name
            || TypeDefMgr.instance.getTypedefDecl(node.id)?.name
            || nestedFromRecordDecl?.nestedRecordsNames.get(node.nameLoc)
            || node.nameLoc;

        if (nestedFromRecordDecl) {
            printer.println(`class ${className} {`);
        } else {
            printer.println(`export class ${className} {`);
        }

        printer.addAdvance(1);

        // generate code for fields
        node.fields.forEach(field => {
            const fieldType = node.nestedRecordsNames.get(field.type.typeDesc) || field.type.typeDesc;
            printer.println(`public ${field.name}: ${fieldType} = ${field.type.getDefaultInitializer()};`);
        });

        // generate constructor
        printer.println(`public constructor(...args: any[]) {`);
        printer.addAdvance(1);
        for (let i = 0; i < node.fields.length; i++) {
            const field = node.fields[i];
            printer.println(`args.length >= ${i + 1} && (this.${field.name} = args[${i}]);`);
        }
        printer.subAdvance(1);
        printer.println(`}`);

        printer.subAdvance(1);
        printer.println(`}`);
    }
} 