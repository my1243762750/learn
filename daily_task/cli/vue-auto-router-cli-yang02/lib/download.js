/*
  util.promisify是在node.js 8.x版本中新增的一个工具，用于将老式的callback回调转换为Promise对象，让老项目改造变得更为轻松。
*/
const { promisify } = require('util');

// repo下载的地址, desc文件夹名字
module.exports.clone = async function(repo, desc){

  /*
    download(repository, destination, options, callback)
      The shorthand repository string to download the repository from:
        GitHub - github:owner/name or simply owner/name
        GitLab - gitlab:owner/name
        Bitbucket - bitbucket:owner/name

  */
  const download = promisify(require('download-git-repo'));
  
  // ora包用于显示加载中的效果，类似于前端页面的loading效果。
  const ora = require('ora');
  const process = ora(`下载......${repo}`);

  process.start();
  await download(repo, desc);
  process.succeed();
  
};