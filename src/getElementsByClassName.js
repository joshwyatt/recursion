// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// document.body.childNodes[].nodeName.toLowerCase();
// document.body.childNodes[].classList;

// if (childNodes.length)

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
};

var a = dbc[2].childNodes[0].childNodes[0].childNodes[0].childNodes.length;
var b = document.getElementsByClassName('targetClassName');

console.log(b);

