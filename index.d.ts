export interface VFSStats {
    type: number;
    bsize: number;
    blocks: number;
    bfree: number;
    bavail: number;
    files: number;
    ffree: number;
}

export function statvfs(path: string | Buffer): Promise<VFSStats>;
