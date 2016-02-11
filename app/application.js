class Application extends Mn.Application {

	initialize() {
		console.log('init');
		super.initialize();
	}

	start() {
		if (Backbone.history) {
			Backbone.history.start();
		}
		super.start();
	}

};
console.log('init2');
export default new Application();
