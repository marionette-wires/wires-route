describe('Route', function() {
  beforeEach(function() {
    this.route = new Route();
  });

  describe('enter', function() {
    beforeEach(function() {
      stub(this.route, 'fetch');
      stub(this.route, 'render');

      this.route.on('before:enter',  (this.onBeforeEnter = stub()));
      this.route.on('before:fetch',  (this.onBeforeFetch = stub()));
      this.route.on('fetch',         (this.onFetch = stub()));
      this.route.on('before:render', (this.onBeforeRender = stub()));
      this.route.on('render',        (this.onRender = stub()));
      this.route.on('enter',         (this.onEnter = stub()));
      this.route.on('error',         (this.onError = stub()));
    });

    describe('when everything is successful', function() {
      beforeEach(function() {
        return this.route.enter('argOne', 'argTwo');
      });

      it('should trigger the events', function() {
        expect(this.onBeforeEnter)
          .to.have.been.calledWith(this.route);
        expect(this.onBeforeFetch)
          .to.have.been.calledWith(this.route);
        expect(this.onFetch)
          .to.have.been.calledWith(this.route);
        expect(this.onBeforeRender)
          .to.have.been.calledWith(this.route);
        expect(this.onRender)
          .to.have.been.calledWith(this.route);
        expect(this.onEnter)
          .to.have.been.calledWith(this.route);
        expect(this.onError)
          .not.to.have.been.called;
      });

      it('should run in order', function() {
        expect(this.onBeforeEnter, 'before:enter')
          .to.have.been.calledBefore(this.onBeforeFetch);
        expect(this.onBeforeFetch, 'before:fetch')
          .to.have.been.calledBefore(this.route.fetch);
        expect(this.route.fetch, 'fetch()')
          .to.have.been.calledBefore(this.onFetch);
        expect(this.onFetch, 'fetch')
          .to.have.been.calledBefore(this.onBeforeRender);
        expect(this.onBeforeRender, 'before:render')
          .to.have.been.calledBefore(this.route.render);
        expect(this.route.render, 'render()')
          .to.have.been.calledBefore(this.onRender);
        expect(this.onRender, 'render')
          .to.have.been.calledBefore(this.onEnter);
      });
    });

    describe('when something throws an error', function() {
      beforeEach(function() {
        this.route.fetch.throws(new Error('Oh no, you didnt'));
        return this.route.enter();
      });

      it('should skip to the error handler', function() {
        expect(this.onBeforeEnter, 'before:enter')
          .to.have.been.calledWith(this.route);
        expect(this.onBeforeFetch, 'before:fetch')
          .to.have.been.calledWith(this.route);
        expect(this.onFetch, 'fetch')
          .not.to.have.been.called;
        expect(this.onBeforeRender, 'before:render')
          .not.to.have.been.called;
        expect(this.onRender, 'render')
          .not.to.have.been.called;
        expect(this.onEnter, 'enter')
          .not.to.have.been.called;
        expect(this.onError, 'error')
          .to.have.been.calledWith(this.route, new Error('Oh no you didnt'));
      });
    });
  });

  describe('exit', function() {

  });

  describe('fetch', function() {

  });

  describe('render', function() {

  });

  describe('destroy', function() {

  });
});
