var adapter = require('backbone-pflock'),
    Backbone = require('solutionio-backbone');

describe('test setup', function () {
    it('should work', function () {
        true.should.not.equal(false);
    });
});


describe('backbone-pflock', function () {

    var el,
        model;

    beforeEach(function () {
        el = $('#backbone-pflock').clone().get(0);
        $(el).appendTo('body');

        model = new Backbone.Model({
            username:       'Yohn Yapan',
            description:    'foo',
            type:           '1',
            speed:          '9'
        });
    });

    var documentEqualsModel = function () {
        $(el).find('.username').val().should.equal(model.get('username'));
        $(el).find('.description').val().should.equal(model.get('description'));
        $(el).find('.type').val().should.equal(model.get('type'));
        $(el).find('.speed').val().should.equal(model.get('speed'));
    };

    it('should write the model data to the document', function () {
        adapter(el, model);
        documentEqualsModel();
    });
});
