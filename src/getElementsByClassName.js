// This function will return any elements of given `className` within the dom. It is a 
// reimplementation of the native `getElementsByClassName`, intentionally using recursion
var getElementsByClassName = function(className){

	  // Helper function to iterate through arrays and objects
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

		// Return whether or not a node has the target class name
		var hasTargetClass = function(className, node) {
			var result = false;
			forEach(node.classList, function(item) {
				if (item == className) {
					result = true;
				}
			});
			return result;
		};

		// Returns whether or not a node contains child nodes
		var hasChildNodes = function(node) {
			return node.childNodes.length > 0;
		};

		// Recursively traverses a node and all of its descendants, returning all nodes
		// that contain the target class name
		var searchForClassNameRecursively = function(node, className, results) {
			if (hasTargetClass(className, node)) {
				results.push(node);
			}
			if (hasChildNodes(node)) {
				forEach(node.childNodes, function(childNode) {
					if (typeof childNode === 'object') {
						searchForClassNameRecursively(childNode, className, results);
					}
				});
			}
			return results;
		}

		// Main function call, initiating recursive traversal of `document.body`, returning
		// all nodes within it that contain the target class name
		return searchForClassNameRecursively(document.body, className, []);
};

