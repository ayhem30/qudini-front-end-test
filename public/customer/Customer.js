(function () {

	angular.module('qudini.QueueApp')
		.directive('customer', Customer)
		.directive('serveCustomer', ServeCustomer);

	Customer.$inject = ['$http'];

	/**
	* The <customer> directive is responsible for:
	* - serving customer
	* - calculating queued time
	* - removing customer from the queue
	*/
	function Customer($http) {
		return {
			restrict: 'E',
			scope: {
				customer: '=',
				onRemoved: '&',
				onServed: '&'
			},
			templateUrl: '/customer/customer.html',
			link: function (scope) {

				// calculate how long the customer has queued for
				scope.queuedTime = new Date() - new Date(scope.customer.joinedTime);

				scope.serve = function () {
					$http.put('/api/customer/serve', {
						id : scope.customer.id
					}).then(function (res) {
						scope.onServed();
					});
				};

				scope.remove = function () {
					$http.delete('/api/customer/remove', { params: {
						id : scope.customer.id
					} }).then(function (res) {
						scope.onRemoved();
					});
				};

			}
		};
	}

	/**
	* The <serveCustomer> directive is responsible for:
	* - list served customer
	*/
	function ServeCustomer() {
		return {
			restrict: 'E',
			templateUrl: '/customer/serve-customer.html'
		};
	}

})();
