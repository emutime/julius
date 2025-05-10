import { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
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
            if (!node.isUsed) {
                return;
            }
        }

        // TODO: generate code for dependent record decls
        // node.fields.forEach(field => TransformerMgr.instance.transformSynx(field, sourceFile, printer));
        const className = node.name || `unnamed${node.node.loc.line}_${node.node.loc.col}`
        printer.println(`export class ${className} {`);
        printer.addAdvance(1);

        // generate code for fields
        node.fields.forEach(field => {
            printer.println(`public ${field.name}: ${field.type.typeDesc} = ${field.type.getDefaultValue()};`);
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