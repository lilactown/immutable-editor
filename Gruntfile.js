// grunt config

module.exports = function(grunt) {

	grunt.initConfig({
		// browserify: {
		// 	libs: {
		// 		src: ['.'],
		// 		dest: 'dist/js/libs.js',
		// 		options: {
		// 			alias: ['react:', 'immutable:', 'material-ui:']
		// 		}
		// 	},
		// 	app: {
		// 		src: ['src/js/index.js'],
		// 		dest: 'dist/js/app.js',
		// 		options: {
		// 			watch: true,
		// 			keepAlive: true,
		// 			external: ['react', 'immutable', 'material-ui']
		// 		}
		// 	}
		// }
		babel: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.*'],
					dest: 'dist/',
					ext: '.js'
				}]
			}
		}
	});

	// grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-babel');

	grunt.registerTask('default', ['babel']);//['browserify']);

};
