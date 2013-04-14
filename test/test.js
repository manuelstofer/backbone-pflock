var adapter     = require('backbone-pflock'),
    Backbone    = require('solutionio-backbone');
    trigger     = require('adamsanderson-trigger-event');

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
            speed:          '9',
            tags: ['bla']
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
        $(el).find('.tag').html().should.equal(model.get('tags')[0]);
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
        $(el).find('.tag').val('changed');
        trigger($(el).find('.speed').get(0), 'read', {bubbles: true});
        documentEqualsModel();
    });

    it('changes in backbone model are pushed to document', function () {
        adapter(el, model);

        model.set('username',       'someone else');
        model.set('description',    'its not you');
        model.set('type',           '2');
        model.set('type',           '1');

        documentEqualsModel();
    });
});

/**
 * Visible Example in Test Runner
 * @type {Backbone.Model}
 */
var example = new Backbone.Model({
    username:       'Yohn Yapan',
    description:    'foo',
    type:           '1',
    speed:          '9',
    tags: ['bla']
});

adapter($('#backbone-pflock').get(0), example);
example.on('change', function () {
    console.log(example.toJSON());
});

