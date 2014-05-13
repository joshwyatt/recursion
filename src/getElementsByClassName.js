// If life was easy, we could just do things the easy way:
// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){

		var forEach = function(collection, iterator) {
			if (Array.isArray(collection)) {
			  for (var i = 0; i < collection.length; i++) {
			    iterator(collection[i], i, collection);
			  }
			} else {
			  for (var k in collection) {
			    iterator(collection[k], k, collection)
			  }
			}
		};

		var hasTargetClass = function(className, node) {
			var result = false;
			forEach(node.classList, function(item) {
				if (item == className) {
					result = true;
				}
			});
			return result;
		};

		var hasChildNodes = function(node) {
			return node.childNodes.length > 0;
		};

		var results = [];

		var searchForClassNameRecursively = function(node, className) {
			if (hasTargetClass(className, node)) {
				results.push(node);
			}
			if (hasChildNodes(node)) {
				forEach(node.childNodes, function(childNode) {
					if (typeof childNode === 'object') {
						searchForClassNameRecursively(childNode, className);
					}
				});
			}
		}

		searchForClassNameRecursively(document.body, className);
		return results;
};

