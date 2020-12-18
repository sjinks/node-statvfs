const addon = require('.');
const should = require('should');

describe('Addon', () => {
    it('should export statvfs symbol', () => {
        should.exist(addon.statvfs);
    });
});

describe('statvfs', () => {
    it('should return a promise', () => {
        return addon.statvfs(__filename).should.be.fulfilled();
    });

    it('should succeed for existing paths', () => {
        return addon.statvfs('/')
            .then((res) => {
                res.should.be.an.Object();
                res.should.have.properties('type', 'bsize', 'blocks', 'bfree', 'bavail', 'files', 'ffree');
                res.bavail.should.be.lessThanOrEqual(res.bfree);
                res.bfree.should.be.lessThanOrEqual(res.blocks);
                res.bsize.should.be.greaterThanOrEqual(0);
                res.ffree.should.be.lessThanOrEqual(res.files);
            });
    });

    it('should accept Buffers', () => {
        return addon.statvfs(Buffer.from('/'))
            .then((res) => {
                res.should.be.an.Object();
                res.should.have.properties('type', 'bsize', 'blocks', 'bfree', 'bavail', 'files', 'ffree');
            });
    });

    it('should fail for non-existing paths', () => {
        const path = __filename + '/';
        return addon.statvfs(path).should.be.rejected()
            .then((e) => {
                e.should.be.instanceof(Error);
                e.should.have.properties('code', 'errno', 'path', 'message');
                e.path.should.be.equal(path);
            });
    });
});

describe('statvfsSync', () => {
    it('should succeed for existing paths', () => {
        const res = addon.statvfsSync('/')
        res.should.be.an.Object();
        res.should.have.properties('type', 'bsize', 'blocks', 'bfree', 'bavail', 'files', 'ffree');
        res.bavail.should.be.lessThanOrEqual(res.bfree);
        res.bfree.should.be.lessThanOrEqual(res.blocks);
        res.bsize.should.be.greaterThanOrEqual(0);
        res.ffree.should.be.lessThanOrEqual(res.files);
    });

    it('should accept Buffers', () => {
        const res = addon.statvfsSync(Buffer.from('/'))
        res.should.be.an.Object();
        res.should.have.properties('type', 'bsize', 'blocks', 'bfree', 'bavail', 'files', 'ffree');
    });

    it('should fail for non-existing paths', () => {
        const path = __filename + '/';
        (() => addon.statvfsSync(path)).should.throw(Error);
    });
});
