# node-statvfs

Wrapper around uv_fs_statfs() function

# Example

```js
const { statvfs, statvfsSync } = require('@wwa/statvfs');

// Asynchronous API, uses uv_fs_statfs()
statvfs('/').then((stat) => {
    console.log('Total space:', stat.blocks * stat.bsize / 1073741824, 'GiB');
    console.log('Free space:', stat.bfree * stat.bsize / 1073741824, 'GiB');
    console.log('Available space:', stat.bavail * stat.bsize / 1073741824, 'GiB');

    console.log('Total inodes:', stat.files);
    console.log('Free inodes:', stat.ffree);
});

// Synchronous API (since 1.1.0), uses statvfs()
const stat = statvfsSync('/');
console.log('Total space:', stat.blocks * stat.bsize / 1073741824, 'GiB');
console.log('Free space:', stat.bfree * stat.bsize / 1073741824, 'GiB');
console.log('Available space:', stat.bavail * stat.bsize / 1073741824, 'GiB');

console.log('Total inodes:', stat.files);
console.log('Free inodes:', stat.ffree);
```
