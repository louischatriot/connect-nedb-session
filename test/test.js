var connect = require('connect')
  , NedbStore = require('../index')(connect.session)
  , testDb = 'workspace/test.db'
  , should = require('chai').should()
  , assert = require('chai').assert
  ;


describe('Database', function () {
  var nedbStore;

  beforeEach(function (done) {
    nedbStore = new NedbStore({ filename: testDb }, done);
  });

  it('Able to set then get some data for a given sid', function (done) {
    var d = new Date();

    nedbStore.set('somesid', { hello: 'world', expire: d }, function (err) {
      assert.isNull(err);

      nedbStore.get('somesid', function (err, data) {
        assert.isNull(err);
        data.hello.should.equal('world');
        data.expire.getTime().should.equal(d.getTime());

        done();
      });
    });
  });

  it('Able to destroy the session data for a given sid', function (done) {
    nedbStore.set('somesid', { hello: 'world' }, function (err) {
      assert.isNull(err);

      nedbStore.get('somesid', function (err, data) {
        assert.isNull(err);
        data.hello.should.equal('world');

        nedbStore.destroy('somesid', function (err) {
          assert.isNull(err);

          nedbStore.get('somesid', function (err, data) {
            assert.isNull(err);
            assert.isNull(data);

            done();
          });
        });
      });
    });
  });

});
