const fs = window.require('fs').promises;
// const path = window.require('path');

const fileHelper = {
  readFile: (path) => {
    return fs.readFile(path, { encoding: 'utf8' })
  },
  writeFile: (path, content) => {
    return fs.writeFile(path, content, { encoding: 'utf8' })
  },
  reName: (path, newPath) => {
    return fs.rename(path, newPath)
  },
  deleteFile: (path) => {
    return fs.unlink(path)
  }
}

// const readPath = path.join(__dirname, 'helper.js')
// const writepath = path.join(__dirname, 'helper.md')
// const newPath = path.join(__dirname, 'rename.md')
// fileHelper.readFile(readPath, (data) => {
//   console.log(data);
// })

// fileHelper.writeFile(writepath, '### hello word', () => {
//   console.log('写入成功');
//   fileHelper.readFile(writepath, (data) => {
//     console.log(data);
//   })
// })

// fileHelper.reName(writepath, newPath).then(res => {
//   console.log(res);
//   console.log('文件名变更成功');
// })

// fileHelper.deleteFile(newPath).then(res => {
//   console.log(res);
//   console.log(`${newPath}文件删除成功`);
// })

module.exports = fileHelper