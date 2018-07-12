QUnit.test("Pretty Date Test", function (assert) {
    let now = new Date(Date.now());

    assert.equal(prettyDate(now.toISOString()), "Just now");
});