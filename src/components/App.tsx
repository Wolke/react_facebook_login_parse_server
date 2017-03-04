import * as React from 'react';
import * as Parse from "parse";
import { User } from "parse";
import FacebookLogin from 'react-facebook-login';

Parse.initialize("xxxxx", "xxxxx");
(Parse as any).serverURL = window.location.protocol + "//" + window.location.hostname + "/parse";
    
// const FB = {} as any;
const responseFacebook = (response) => {
    // (Parse as any).serverURL = "https://09191429.ngrok.io/parse";

    Parse.FacebookUtils.init();
    // Parse.FacebookUtils.isLinked(Parse.User.current());



    Parse.FacebookUtils.logIn(null, {
        success: function (user) {
            if (!user.existed()) {
                alert("User signed up and logged in through Facebook!");
            } else {
                console.log("User logged in through Facebook!");
                (window as any).FB.api('/me?fields=name,picture', (r) => { console.log(r) })
            }
        },
        error: function (user, error) {
            alert("User cancelled the Facebook login or did not fully authorize.");
        }
    });
}

const signupUser = () => {
    let user = Parse.User.current();
    if (user === null) {
        Parse.User.signUp("aaaabbb", "bbbb", null).done(user => {
            if (!Parse.FacebookUtils.isLinked(user)) {
                Parse.FacebookUtils.link(user, null, {
                    success: function (user) {
                        alert("Woohoo, user logged in with Facebook!");
                    },
                    error: function (user, error) {
                        alert("User cancelled the Facebook login or did not fully authorize.");
                    }
                });
            }
        })
    }
}


export class App extends React.Component<{
}, {
    }> {


    render() {
        let style = {
            height: "100%",
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#e6e6e6",
            position: "fixed",
            top: "0px",
            left: "0px",
            boxShadow: "0px 3px 3px 0px rgba(50, 50, 50, 0.5)"
        }

        return (
            <div style={style}>
                <button onClick={() => {
                    signupUser();
                    console.log("begin")
                }} >signup || login</button>
                <FacebookLogin
                    appId="xxxx"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook"

                />
            </div>
        )
    }
}