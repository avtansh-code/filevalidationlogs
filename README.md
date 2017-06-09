# File Validation Logs


##About:

File Validation Logs is a resuable frontend component that is used for the display of errors, warnings and other such details about uploaded files that need to be shown to the user before they proceed further.


##Required External Dependecies

The following packages need to be required in the project before the use of this component

	npm install angular --save

	npm install angular-animate --save
	
	npm install angular-aria --save

	npm install angular-material --save

	npm install angular-sanitize --save

	npm install angular-ui-bootstrap --save

	npm install bootstrap --save

	npm install jquery --save


##Steps for Installation:

1. Update npmrc config file

	1.1 open npmrc file

		vim ~/.npmrc

	This needs to be done at the root folder
	
	1.2 add following lines to npmrc file for setting private and default npm registry

		
		registry=http://registry.npmjs.org/

		@eluci:registry=http://54.245.179.143:81/
		
2. The package has required css files locally and hence for these css files to work the user needs to use a css loader in his project, if not already used.

	The user can refer to the following link for browserify-css loader: https://github.com/cheton/browserify-css


3. Install the package


		npm install @eluci/filevalidationlogs --save


4. Require the package

	
		const filevalidationlogs = require(‘@eluci/filevalidationlogs’);

		app.module('myModule',[filevalidationlogs])
	

##Usage:


	<file-tabs
	    data = "sample_data"
	    listcolors='{errors:"#EA4436",warnings:"#C57D00"}' 
        labelsize='1.9em' 
		textsize='1em'
        download-icon="block" 
		page-size=5>
	</file-tabs>




######SAMPLE DATA


	sample_data = {
		"file 1": {
			"errors": ["error1", "error2", "error3", "error4", "error5", "error6"],
			"warnings": []
		},
		"file 2": {
			"errors": ["error1", "error2", "error3", "error4"],
			"warnings": ["warning1", "warning2", "warning3", "warning4"]
		},
		"file 3": {
			"errors": ["error1", "error2", "error3"],
			"warnings": ["warning1", "warning2", "warning3", "warning4", "warning5", "warning6"]
		},
		"file 4": {
			"errors": [],
			"warnings": [],
		},
		"file 5": {
			"errors": [],
			"warnings": ["warning1", "warning2", "warning3", "warning4", "warning5"]
		},
		"file 6": {
			"errors": ["error1"],
			"warnings": ["warning1"]
		}
	}


The file name is the key to an object. Each object will have arrays of the details that the users wishes to display. Here we are using only two details warnings and errors but the user can display summary as well. It will also be in the same manner.

**Note: All the objects in the JSON object should contain all the arrays. If the array does not have any entries associated to it for that particular file, then the list can be left empty, but it needs to be defined. For references please have a look at the above example.**

##The customisations possible in the module


**1. listcolors – it will be the color corresponding to each list in the given data**

It will take an object as input. The keys will be the same as the names of the arrays in each object of the json data and the colors need to be input in the hex/string format. Default value is **black** for all the accordions.

**e.g.**

	listcolors = '{errors:"#EA4436",warnings:"#FBBD09"}'

if the object has two arrays – errors and warnings


**2. labelsize – the font size of the accordion label – text size**

It will take values just like the font-size attribute of css.

**e.g.**

	labelsize = '1.9em'


**3. textsize – the font size of the body of each accordion**

It will take values just like the font-size attribute of css

**e.g.**
	
	textsize = '1.2em'


**4. download-icon – this is to set whether the user wishes to see the download icon or not**

It takes in one of the two values – block(show icon) or none(hide icon). Default value is block, i.e. the download icon will be displayed by default.

**e.g.**

	download-icon = 'block'


**5. page-size – this is for the pagination section. This defines the number of items per page when applying pagination.**

It takes in a number as the input which depicts the item per page. Default value is 20.

**e.g.**
	
	page-size = 5