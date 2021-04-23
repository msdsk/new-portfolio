var visit = require('unist-util-visit')

module.exports = function attacher() {
  return transformer

  function transformer(tree) {
    visit(tree, { tagName: 'h2' }, (node) => {
      node.children = [{
        type: 'element',
        tagName: 'span',
        properties: { class: 'header-content' },
        children: node.children || []
      }]
    })
  }

}
