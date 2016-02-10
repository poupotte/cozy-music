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

export default new Application();
