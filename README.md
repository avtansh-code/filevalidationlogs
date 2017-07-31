# File Validation Logs


## About:

File Validation Logs is a resuable frontend component that is used for the display of errors, warnings and other such details about uploaded files that need to be shown to the user before they proceed further.


## Required External Dependecies

The following packages need to be installed and required in the project before the use of this component - this can be done by using cdn links, node modules paths, bower paths, etc.

	1. jquery - js file
	2. bootstrap - js and css file
	3. angular - js file
	4. angular-aria - js file
	5. angular-animate - js file
	6. angular-sanitize - js file
	7. angular-material - js and css file
	8. angular-ui-bootstrap - tpls.js file

>_**Note: angular, angular-animate, angular-aria and angular-sanitize version should be same (minimum version of these packages should be 1.5.8). The version for angular-ui-bootrap should be a minimum of 2.5.0**_

Apart from the above mentioned dependencies the user also needs to add the following css for material icons 


```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
```


## Steps for Installation:

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
	

## Usage:

```html
    <file-tabs
        data = "sampleData"
        listcolors = "listColors"
        labelsize = "1.9em" 
        textsize = "1em"
        download-icon = "block" 
        page-size = 5      
        title = "File Validation Logs">
    </file-tabs>
```

>_**sampleData and listColors are variables that are being set by the user please refer below for the example of the value they can take**_



## The customisations possible in the module


**1. data (mandatory) - it will take the logs which need to be printed**

The data needs to be inputted in the JSON format. The file name is the key to an object. Each object will have arrays of the different types of logs that the users wishes to display. Here we are using only two types of logs - errors and  warnings. All the objects in the JSON should contain all the arrays. If the array does not have any entries associated to it for that particular file, then the list can be left empty, but it needs to be defined. 

**This attribute is mandatory and cannot be skipped**
	
	For references please have a look at the example below.


**2. listcolors (optional) – it will be the color corresponding to each list in the given data**

It will take an object as input. The keys will be the same as the names of the arrays in each object of the json data and the colors need to be input in the **hex format only**. Default value is **black**. 

	Please have a look at the sample data mentioned below for example references.


**3. labelsize (optional) – the font size of the accordion label – text size**

It will take values just like the font-size attribute of css. Default value is **25px**.

**e.g.**

	labelsize = "1.9em"


**4. text-size (optional) – the font size of the body of each accordion**

It will take values just like the font-size attribute of css. Default value is **15px**.

**e.g.**
	
	textsize = "1.2em"


**5. download-icon (optional) – this is to set whether the user wishes to see the download icon or not**

It takes in one of the two values – block(show icon) or none(hide icon). Default value is **block**, i.e. the download icon will be displayed by default.

**e.g.**

	download-icon = "block"


**6. page-size (optional) – this is for the pagination section. This defines the number of items per page when applying pagination.**

It takes in a number as the input which depicts the item per page. Default value is **20**.

**e.g.**
	
	page-size = 5


**7. title (optional) - this is for displaying the title for the module.**

It takes in a string as the input. The inputted string will be the title of the module. If the attribute is not defined then it will not be displaying any title.

**e.g.**

	title = "File Validation Logs"



## Sample Data

    listColors:object = {errors:"#EA4436",warnings:"#C27600"}

	sampleData:object = {
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
