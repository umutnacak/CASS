var WelcomeScreen = function() {
    CassManagerScreen.call(this);
};
WelcomeScreen = stjs.extend(WelcomeScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "welcome";
    prototype.getDisplayName = function() {
        return WelcomeScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/welcome.html";
    };
}, {data: "Object", reloadLoginCallback: "Callback1", reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
