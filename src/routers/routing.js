import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { map } from 'lodash';
import configRouter from './configRouter';

export default function routing (){
    return(
        <Router>
            <Switch>
                {map(configRouter, (route,index) =>(
                      <Route key={index} path={route.path} exact={route.exact}>
                      <route.page/>
                  </Route>
                  
                ))}
            </Switch>    
         </Router> 
    );
}