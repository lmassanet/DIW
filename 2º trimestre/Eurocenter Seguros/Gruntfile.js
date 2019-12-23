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
                        { name: "xs", suffix: "300w", quality: 70, width: 300 },            
                        { name: "sm", suffix: "600w", quality: 70, width: 600 },                       
                        { name: "md", suffix: "800w", quality: 70, width: 800 },            
                        { name: "lg", suffix: "1000w", quality: 70, width: 1000 },            
                        { name: "xl", suffix: "1200w", quality: 70, width: 1200 }          
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