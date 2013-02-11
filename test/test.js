var adapter = require('backbone-pflock'),
    Backbone = require('solutionio-backbone');

describe('test setup', function () {
    it('should work', function () {
        true.should.not.equal(false);
    });
});

var example = new Backbone.Model({
    username:       'Yohn Yapan',
    description:    'foo',
    type:           '1',
    speed:          '9'
});

adapter($('#backbone-pflock').get(0), example);


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

    afterEach(function () {
        $(el).remove();
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

    it('push changes in the document back to the backbone model', function () {
        adapter(el, model);

        $(el).find('.username').val('changed');
        $(el).find('.description').val('bla');
        $(el).find('.type').val('0');
        $(el).find('.speed').val('3');

        triggerEvent($(el).find('.username').get(0), 'change');
        triggerEvent($(el).find('.description').get(0), 'change');
        triggerEvent($(el).find('.type').get(0), 'change');
        triggerEvent($(el).find('.speed').get(0), 'change');

        documentEqualsModel();
    });
});

function triggerEvent (element, event) {
    var evt = document.createEvent('Event');
    evt.initEvent(event, true, true);
    element.dispatchEvent(evt);
}
