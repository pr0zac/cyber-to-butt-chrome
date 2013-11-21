function walk(node)
{
  // I stole this function from here:
  // http://is.gd/mwZp7E

  var child, next;

  switch ( node.nodeType )
  {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
    child = node.firstChild;
      while ( child )
      {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node);
      break;
  }
}

function handleText(textNode)
{
  var v = textNode.nodeValue;

  v = v.replace(/(\bcyber)([^\s]+)/g, 'butt$2');
  v = v.replace(/(\bCyber)([^\s]+)/g, 'Butt$2');

  textNode.nodeValue = v;
}

walk(document.body);
var cyber_butt_timer = null;

var observer = new MutationObserver(function(mutations) {
  for (i = 0; i < mutations.length; ++i) {
    if (mutations[i].addedNodes.length > 0) {
      if (cyber_butt_timer) {
        clearTimeout(cyber_butt_timer);
      }
      cyber_butt_timer = setTimeout(function() {
        walk(document.body);
      }, 50);
      break;
    }
  }
});
var config = { attributes: true, childList: true, characterData: true };
observer.observe(document.body, config);

