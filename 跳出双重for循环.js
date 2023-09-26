function test() {
  for (let i = 0; i < 100; i++) {
    let line = '第' + i + '行'
    for (let j = 0; j < 10; j++) {
      line += j
      if (i + j === 50) {
        return
      }
    }
    console.log(line)
  }
}
test()
