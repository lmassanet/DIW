/*Despues de instalar los programas, creamos variables donde almacenaremos las llamadas a estos programas y los pondremos como obligatorios*/
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var gifsicle = require('imagemin-gifsicle');
var svgo = require('imagemin-svgo');

/*Añadimos los modulos de grunt*/
module.exports = function(grunt) {  
    grunt.initConfig({    
        responsive_images: {   //redimensionar las imagenes
            dev: {        
                options: {          
                    engine: "gm",          
                    sizes: [            
                        { name: "sm", suffix: "_1x", quality: 70, width: 600 },            
                        { name: "sm", suffix: "_2x", quality: 70, width: 1200 },            
                        { name: "md", suffix: "_1x", quality: 70, width: 900 },            
                        { name: "md", suffix: "_2x", quality: 70, width: 1800 },            
                        { name: "lg", suffix: "_1x", quality: 70, width: 1440 },            
                        { name: "lg", suffix: "_2x", quality: 70, width: 2880 }          
                    ]        
                },        
                    files: [          
                        {   expand: true,            
                            src: ["**/*.{jpg,png}"],            
                            cwd: "img_originales/",            
                            dest: "img_optimizadas/"          
                        }        
                    ]      
            }
        },

        imagemin: { //optimizar las imagenes
	        app: {
	            options: {
	                optimizationLevel: 6,
	                progressive: true,
	                use: [pngquant(),mozjpeg(),gifsicle(),svgo()] // Example plugin usage
	            },
	            files: [{
	                expand: true,
	                cwd: 'img_optimizadas/',
	                src: ['**/*.{png,jpg,gif,svg}'],
	                dest: 'img_dest/'
	            }]
	        }
    	}//imagemin


    })
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks("grunt-responsive-images");
grunt.registerTask('reduce', ['responsive_images','imagemin']);
};