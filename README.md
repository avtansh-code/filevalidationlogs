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

		vim ~./npmrc
	
	1.2 add following lines to npmrc file for setting private and default npm registry

		
		registry = http://registry.npmjs.org/

		@eluci: registry = http://54.245.179.143:81/
		

2. Install the package


		npm install @eluci/filevalidationlogs --save


3. Require the package

	
		const filevalidationlogs = require(‘@eluci/filevalidationlogs’);

		app.module('myModule',[filevalidationlogs])
	

##Usage:


	<file-tabs
	    data = "sample_data"
	    textcolors='{error:"#EA4436",warning:"#FBBD09"}' 
	    labelbg='{error:"#EA4436",warning:"#FBBD09"}' 
    	labelweight='bold' 
		labelsize='1.9em' 
		textsize='1em'
	    download-icon='block' 
		page-size=20>
	</file-tabs>




######SAMPLE DATA


	sample_data = {
		"file 1": {
			"error": ["error1", "error2", "error3", "error4", "error5", "error6"],
			"warnsing": []
		},
		"file 2": {
			"error": ["error1", "error2", "error3", "error4"],
			"warning": ["warning1", "warning2", "warning3", "warning4"]
		},
		"file 3": {
			"error": ["error1", "error2", "error3"],
			"warning": ["warning1", "warning2", "warning3", "warning4", "warning5", "warning6"]
		},
		"file 4": {
			"error": [],
			"warning": ["warning1", "warning2", "warning3"],
		},
		"file 5": {
			"error": ["error1", "error2", "error3", "error4"],
			"warning": ["warning1", "warning2", "warning3", "warning4", "warning5"]
		},
		"file 6": {
			"error": ["error1"],
			"warning": ["warning1"]
		}
	}


The file name is the key to an object. Each object will have arrays of the details that the users wishes to display. Here we are using only two details warning and error but the user can display summary as well. It will also be in the same manner.

##The customisations possible in the module


**1. textcolor – text color of the data displayed inside the accordion**

It will take an object as input. The keys will be the same as the names of thee arrays in each object of the json data and the colors need to be input in the hex format.

**e.g.**

	textcolors = '{error:"#EA4436",warning:"#FBBD09"}'

if the object has two arrays – error and warning


**2. labelbg – backround of the label for the accordion heading (group heading)**

It will take an object as the input. It will be working the same way textcolor works.

**e.g.**

	labelbg = '{error:"#EA4436",warning:"#FBBD09"}'

if the object has two arrays – error and warning


**3. labeweight – set if the label needs to be bold or not.**

It will take in only two values as the input – bold or normal.

**e.g.**
	
	labelweight = 'bold'


**4. labelsize – the font size of the accordion label – text size**

It will take values just like the font-size attribute of csss

**e.g.**

	labelsize = '1.9em'


**5. textsize – the font size of the body of each accordion**

It will take values just like the font-size attribute of css

**e.g.**
	
	textsize = '1.2em'


**6. download-icon – this is to set whether the user wishes to see the download icon or not**

It takes in one of the two values – block(show icon) or none(hide icon). Default value is block

**e.g.**

	download-icon = 'block'


**7. page-size – this is for the pagination section. This defines the number of items per page when applying pagination.**

It takes in a number as the input which depicts the item per page. Default value is 20

**e.g.**
	
	page-size = 10