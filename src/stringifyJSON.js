// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {

	var returnSpecificTypeOf = function(item) {
		if (typeof item !== 'object') {
			return typeof item;
		}
		return item === null ? 'null' : Array.isArray(item) ? 'array' : 'object';
	};
	
};
