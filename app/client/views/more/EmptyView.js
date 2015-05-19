var View          = famous.core.View;
var Surface       = famous.core.Surface;
var Transform     = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;

/*
 * @name EmptyView
 * @constructor
 * @description
 */

EmptyView = function() {
    View.apply(this, arguments);
}

EmptyView.prototype = Object.create(View.prototype);
EmptyView.prototype.constructor = EmptyView;

EmptyView.DEFAULT_OPTIONS = {
};