function AbstractPool (create, size) {
  if (!(this instanceof AbstractPool)) {
    return new AbstractPool(create, size)
  }

  this.store = []
  this.create = create

  if (!isNaN(size)) {
    this.alloc(size)
  }
}

AbstractPool.prototype.push = function (item) {
  this.store.push(item)
}

AbstractPool.prototype.pop = function () {
  return !!this.store.length ? 
    this.store.pop() :
    this.create()
}

AbstractPool.prototype.alloc = function (size) {
  size -= this.store.length
  while (--size >= 0) {
    this.store.push(this.create())
  }
}

AbstractPool.prototype.dealloc = function (size) {
  this.store.splice(size * -1)
}

module.exports = AbstractPool
