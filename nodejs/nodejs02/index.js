let path = require('path');

module.exports = class TestFile {
    getTestFileName(fileName) {
        let dirname = path.dirname(fileName)
        let basename = path.basename(fileName)
        let extname = path.extname(basename)
        let testname = basename.replace(extname, `.spec${extname}`)
        return path.format({
            root: dirname + '/__test__/',
            base: testname
        })
    }
}
