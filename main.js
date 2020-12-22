const { Etcd3 } = require('etcd3');
var NodeEtcd = require('node-etcd');
const testKey = '/hellodir/key'
let count = 0

const nodeEtcdClientLocal = new NodeEtcd(['http://127.0.0.1:2379']);
setInterval(() => {
    const nodeEtcdClientLocal = new NodeEtcd(['http://127.0.0.1:2379']);
    console.log(nodeEtcdClientLocal)
    local()
}, 6000);
const updatedWatcher = ({ client, key, modifiedIndex }) => {
  const watcher = client.watcher(key, modifiedIndex)
  watcher.on('change', (value) => {
    console.log('change ---')
    console.log(value.node)
    console.log('change ====')
    count++
    updatedWatcher({ client, key: value.node.key, modifiedIndex: value.node.modifiedIndex })
    console.log(getNode(testKey))
    console.log('change ==== currentNode')
    console.log(count)
  })
  watcher.on('set', (value) => {
    console.log('set ---')
    console.log(value)
    console.log('set ====')
  })
  watcher.on('delete', (value) => {
    console.log('delete ---')
    console.log(value)
    console.log('delete ====')
  })
  watcher.on('error', (value) => {
    console.log('error ---')
    console.log(value)
    console.log('error ====')
  })
}


const local = async () => {
  const fooValueNode = nodeEtcdClientLocal.getSync('/helloDir')
  console.log(fooValueNode)
  const { body } = fooValueNode
  const { node } = body
  const { nodes } = node
  const currentNode = nodes[0]
  const { key, modifiedIndex } = currentNode
  console.log(currentNode)
  const watcher = nodeEtcdClientLocal.watcher(key, modifiedIndex)
  watcher.on('change', (value) => {
    console.log('change ---')
    console.log(value)
    console.log('change ====')
  })
  watcher.on('set', (value) => {
    console.log('set ---')
    console.log(value)
    console.log('set ====')
  })
  watcher.on('delete', (value) => {
    console.log('delete ---')
    console.log(value)
    console.log('delete ====')
  })
  watcher.on('error', (value) => {
    console.log('error ---')
    console.log(value)
    console.log('error ====')
  })
}

(async () => {
    local()
})();
