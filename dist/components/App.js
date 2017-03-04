"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Parse = require("parse");
var react_facebook_login_1 = require("react-facebook-login");
// const FB = {} as any;
var responseFacebook = function (response) {
    console.log(response);
    Parse.initialize("xxxxx", "xxxxx");
    // (Parse as any).serverURL = window.location.protocol + "//" + window.location.hostname + "/parse";
    Parse.serverURL = "https://09191429.ngrok.io/parse";
    Parse.FacebookUtils.init();
    // Parse.FacebookUtils.isLinked(Parse.User.current());
    // let user = Parse.User.current();
    // if (user === null) {
    //     Parse.User.signUp("aaaabbb", "bbbb", null).done(user => {
    //         if (!Parse.FacebookUtils.isLinked(user)) {
    //             Parse.FacebookUtils.link(user, null, {
    //                 success: function (user) {
    //                     alert("Woohoo, user logged in with Facebook!");
    //                 },
    //                 error: function (user, error) {
    //                     alert("User cancelled the Facebook login or did not fully authorize.");
    //                 }
    //             });
    //         }
    //     })
    // }
    Parse.FacebookUtils.logIn(null, {
        success: function (user) {
            if (!user.existed()) {
                alert("User signed up and logged in through Facebook!");
            }
            else {
                console.log("User logged in through Facebook!");
                window.FB.api('/me?fields=name,picture', function (r) { console.log(r); });
            }
        },
        error: function (user, error) {
            alert("User cancelled the Facebook login or did not fully authorize.");
        }
    });
};
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        var style = {
            height: "100%",
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#e6e6e6",
            position: "fixed",
            top: "0px",
            left: "0px",
            boxShadow: "0px 3px 3px 0px rgba(50, 50, 50, 0.5)"
        };
        return (React.createElement("div", { style: style },
            React.createElement("a", { href: "/" }, "home"),
            React.createElement(react_facebook_login_1.default, { appId: "519736548213789", autoLoad: true, fields: "name,email,picture", callback: responseFacebook, cssClass: "my-facebook-button-class", icon: "fa-facebook" })));
    };
    return App;
}(React.Component));
exports.App = App;
