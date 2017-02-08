var fs = require('fs');
var path = require('path');

//get array files
exports.WalkSync = function(dir) {
	var results = [];
	var list = fs.readdirSync(dir);
	var pending = list.length;
	if (!pending)
		return results;

	list.forEach(function(file) {
		file = path.resolve(dir, file);
		var stat = fs.statSync(file);

		if (stat && stat.isDirectory()) {
			var res = walkSync(file);
			results = results.concat(res);
			if (!--pending)
				return results;
		} else {
			results.push(file);
			if (!--pending)
				return results;
		}

	});

	return results;
}


//Load files (require)
exports.Load = function(app, folder, view) {
	var result = WalkSync(folder);

	if (!result)
		console.log('Load error');
	else {
		result.forEach(function(file) {
			var ext = path.extname(file);
			var basename = path.basename(file, '.js');

			if (basename.length > 2 && basename.substring(0, 2) != '--') { // -- not start with character
				if (ext == '.js') {
					if (view)
						console.log(' + ' + basename);

					var moduleObject = require(file); //get module
					moduleObject(app); //module run

				}
			}
		});
	}
}



