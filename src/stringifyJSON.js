// this is what you would do if you didn't like to learn things:
// var stringifyJSON = JSON.stringify;

// but you do, so you're going to write it from scratch:
var stringifyJSON = function(obj) {

	var js = function(value) {
		console.log(JSON.stringify(value));
	};

	var j = function(value) {
		return JSON.stringify(value);
	};

	var test = function(item) {
		console.log(j(item) == recursivelyStringify(item));
	};

	var returnSpecificTypeOf = function(item) {
		if (typeof item !== 'object') {
			return typeof item;
		}
		return item === null ? 'null' : Array.isArray(item) ? 'array' : 'object';
	};

	var typeSpecificProcesses = {
		'number' : function(num) {
			return num;
		}, 

		'boolean' : function(bool) {
			return bool;
		}, 

		'null' : function(nl) {
			return 'null';
		},

		'undefined' : function() {
			return undefined;
		},

		'function' : function() {
			return undefined;
		},

		'array' : function(arr) {
			var result = [];
			forEach(arr, function(item) {
				result.push(recursivelyStringify(item));
			});
			return '[' + result.join(',') + ']';
		},

		'object' : function(obj) {
			var result = [];
			forEach(obj, function(value, key) {
				result.push('"' + key + '"' + ':' + recursivelyStringify(value));
			});
			return '{' + result.join(',') + '}';
		}

	};

	var recursivelyStringify = function(item) {
		var specificType = returnSpecificTypeOf(item);
		var typeSpecificProcess = typeSpecificProcesses[specificType];
		return typeSpecificProcess(item);
	};

};
