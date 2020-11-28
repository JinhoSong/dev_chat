import React from "react"
import { Route, Redirect } from "react-router-dom"
import {connect} from "react-redux";
import {setRoomId, setRoomName} from "../../modules/chatRooms";

function AuthRoute({ authentication, component: Component, render, ...rest }) {
    //console.log(authentication);
    return (
        <Route
            {...rest}
            render={(props) =>
                authentication ? (
                    // 인증값 true
                    render ? (
                        render(props)
                    ) : (
                        <Component {...props} />
                    )
                ) : (
                    // 인증 값 false -> login page로 이동
                    <Redirect
                        to={{ pathname: "/login", state: { from: props.location } }}
                    />
                )
            }
        />
    )
}

export default connect(
    state => ({
        authentication: state.loginModules.user.authentication,
    })
)(AuthRoute);