var matchAllInbound = require('../lib/match').matchAllInbound,
    matchAllOutbound = require('../lib/match').matchAllOutbound,
    multiline = require('multiline');

describe('match', function () {
  it('matches all inbound events', function () {
    // given
    var results = { a: { inbound: [], outbound: [] }},
        content = multiline(function() {
/*
this.on("b", this.function);
this.on(document, "c", this.function);
this.on("d", function () {
});
this.on(document, "e", function () {
});
*/
    });

    // when
    matchAllInbound(content, results, 'a');

    // then
    expect(results.a.inbound).toContain('b');
    expect(results.a.inbound).toContain('c');
    expect(results.a.inbound).toContain('d');
    expect(results.a.inbound).toContain('e');
  });

  it('matches all outbound events', function () {
    // given
    var results = { a: { inbound: [], outbound: [] }},
        content = multiline(function() {
/*
this.trigger("b", {a: 1});
this.trigger("c", {
  a: 1
});
this.trigger("d", data);
*/
    });

    // when
    matchAllOutbound(content, results, 'a');

    // then
    expect(results.a.outbound).toContain('b');
    expect(results.a.outbound).toContain('c');
    expect(results.a.outbound).toContain('d');
  });

});
