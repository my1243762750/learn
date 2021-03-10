let TestFile = require('../index')

test('测试getTestFileName', () => {
    let res = (new TestFile()).getTestFileName('src/home.js')
    expect(res).toBe('src/__test__/home.spec.js')
})
