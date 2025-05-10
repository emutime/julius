import { SourceFile } from "../CAstNode/SourceFile";


export class SourceFileMgr {
    public static instance: SourceFileMgr = new SourceFileMgr();

    private m_sourceFileMap: Map<string, SourceFile> = new Map<string, SourceFile>();
    public addSourceFile(path: string, sourceFile: SourceFile) {
        if (this.m_sourceFileMap.has(path)) {
            throw new Error(`Source file ${path} already exists`);
        }

        this.m_sourceFileMap.set(path, sourceFile);
    }

    public getSourceFile(path: string): SourceFile {
        return this.m_sourceFileMap.get(path);
    }
}