import React from 'react';
import configRoutes from "../../config/routes";
import { Switch, Redirect, Route } from 'react-router-dom';

function PrivateRoutes(props) {
    const role = props.role || "guest";

    const { allowedRoutes, redirectRoute } = configRoutes[role];

    return (
        <Switch>
            {allowedRoutes.map(route => (
                <Route
                    exact path={route.url}
                    key={route.url}
                    render={(routeProp) => {
                        return <route.page setRole={props.setRole} {...routeProp} route={route.url}/>
                    }}
                >
                </Route>
            ))}
            <Redirect to={redirectRoute} />
        </Switch>
    );
}

export default PrivateRoutes;
