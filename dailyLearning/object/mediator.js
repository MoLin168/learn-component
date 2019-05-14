// 简单的发布订阅模式
var Mediator = {};
Mediator.msg = {};
Mediator.register = function(type, action) {//监听
    if (!type || !action) {return;}
    if (!this.msg[type]) {this.msg[type] = []}
    this.msg[type].push(action);
};
Mediator.send = function() {//触发
    var name = [].shift.call(arguments),
        fns = this.msg[name];
    if (!fns || fns.length === 0) {
        return false;
    }
    for(var i=0;i < fns.length; i++) {
        var fn = fns[i];
        fn.apply(null, arguments);
    }
};
Mediator.clear = function() {
    this.msg = {};
};