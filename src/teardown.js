
	// Expose to global d3
	if (_this.loaded) {
		_this.setup(); 
		window.d3 = _d3;
	}

	return _this;

})();
