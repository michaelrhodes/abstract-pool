var test = require('tape')
var pool = require('./index')

test('it de/allocates as expected', function (assert) {
  var items = pool(function () {
    return {}
  })

  assert.equal(items.store.length, 0, 'it starts empty')
  items.alloc(10)
  assert.equal(items.store.length, 10, 'it fills')
  items.alloc(5)
  assert.equal(items.store.length, 10, 'it doesn’t underfill')
  items.dealloc(5)
  assert.equal(items.store.length, 5, 'it empties')
  items.alloc(10)
  assert.equal(items.store.length, 10, 'it refills')

  assert.end()
})

test('it can be allocated on instantiation', function (assert) {
  var items = pool(function () {
    return {}
  }, 10)

  assert.equal(items.store.length, 10, 'it does')
  assert.end()
})

test('it pops as expected', function (assert) {
  var i = 0
  var items = pool(function () {
    return ++i
  })

  items.alloc(5)
  assert.equal(items.pop(), 5, 'yep')
  assert.equal(items.pop(), 4, 'yep')
  assert.equal(items.pop(), 3, 'yep')
  assert.equal(items.pop(), 2, 'yep')
  assert.equal(items.pop(), 1, 'yep')
  assert.equal(items.pop(), 6, 'it adds extra as needed')
  assert.end()
})

test('it pushes as expected', function (assert) {
  var i = 0
  var item 
  var items = pool(function () {
    return ++i
  })

  items.alloc(5)
  assert.equal(items.pop(), 5, 'yep')
  item = items.pop()
  assert.equal(item, 4, 'yep')
  items.push(item)
  assert.equal(items.pop(), 4, 'it is reused')
  assert.end()
})
