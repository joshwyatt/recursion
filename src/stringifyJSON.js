// this is what I might do if I didn't like to learn things:
// var stringifyJSON = JSON.stringify;

// but I do, so I'm going to write it from scratch:

// This function receives a value of any type, and returns a stringified version
// of it analogous to JSON.stringify
var stringifyJSON = function(obj) {

	// Helper function to iterate through arrays and objects
  var forEach = function(collection, iterator) {
		if (Array.isArray(collection)) {
			for (var i = 0; i < collection.length; i++) {
				iterator(collection[i], i, collection);
			}
		} else {
			for (var k in collection) {
				iterator(collection[k], k, collection);
			}
		}
	};

	// Return a more fine-tuned differentiation of a value's type, especially
	// with regard to objects than the native `typeof`
	var returnSpecificTypeOf = function(item) {
		if (typeof item !== 'object') {
			return typeof item;
		}
		return item === null ? 'null' : Array.isArray(item) ? 'array' : 'object';
	};

	// This object contains all the methods necessary for stringifying all the different
	// types of values
	var typeSpecificProcesses = {

		'number' : function(num) {
			return String(num);
		}, 

		'boolean' : function(bool) {
			return String(bool);
		}, 

		'null' : function() {
			return 'null';
		},

		'undefined' : function() {
			return undefined;
		},

		'function' : function() {
			return undefined;
		},

		// Uses `recursivelyStringify` to handle nested arrays and arrays with objects, etc. to 
		// any depth
		'array' : function(arr) {
			var result = [];
			forEach(arr, function(item) {
				result.push(recursivelyStringify(item));
			});
			return '[' + result.join(',') + ']';
		},

		// Uses `recursivelyStringify` to handle array and object values to any depth
		'object' : function(obj) {
			var result = [];
			forEach(obj, function(value, key) {
				if (typeof value === 'function' || typeof value === 'undefined') {
					return;
				} else {
					result.push('"' + key + '"' + ':' + recursivelyStringify(value));
				}
			});
			return '{' + result.join(',') + '}';
		},

		// Uses regular expressions to mimic JSON.stringify's handling of escape characters, quotes
		// and whitespaces more than one character long
		'string' : function(str) {
			str = str.replace(/\\/g, '\\\\');
			str = str.replace(/\n/g, '\\n');
			str = str.replace(/\t/g, '\\t');
			str = str.replace(/\r/g, '\\r');
			str = str.replace(/\s\s+/g, ' ');
			str = str.replace(/"/g, '\\"');
			return '"' + str + '"';
		}

	};

	// Evaluates specific type of obj, locates proper method to process it, and calls that 
	// method on the obj
	var recursivelyStringify = function(obj) {
		var specificType = returnSpecificTypeOf(obj);
		var typeSpecificProcess = typeSpecificProcesses[specificType];
		return typeSpecificProcess(obj);
	};

	return recursivelyStringify(obj);

};
