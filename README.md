# node-statvfs

Wrapper around uv_fs_statfs() function

# Example

```js
const { statvfs } = require('@wwa/statvfs');

statvfs('/').then((stat) => {
    console.log('Total space:', stat.blocks * stat.bsize / 1073741824, 'GiB');
    console.log('Free space:', stat.bfree * stat.bsize / 1073741824, 'GiB');
    console.log('Available space:', stat.bavail * stat.bsize / 1073741824, 'GiB');

    console.log('Total inodes:', stat.files);
    console.log('Free inodes:', stat.ffree);
});
```
