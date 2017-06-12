export class accordionViewController{

    static AngularDependencies = ['$scope', accordionViewController];

    constructor($scope: ng.IScope){
        
        if($scope.downloadIcon === undefined)
				$scope.downloadIcon = 'block';

		if($scope.pageSize === undefined)
				$scope.pageSize = 20;
    }
}