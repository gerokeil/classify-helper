import React from 'react'
import { UploaderComponent } from './components/uploader/uploader.component';
import "typeface-roboto";
import NavComponent from './components/navigation/nav.component';
import { initializeIcons } from '@uifabric/icons';
import { Router, Switch, Route, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import { HomeComponent } from './components/home/home.component';
import './App.sass';
import '../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';
import '@trendmicro/react-grid-system/dist/react-grid-system.css';
import { Card } from '@uifabric/react-cards';
import { INavLink } from 'office-ui-fabric-react';

export let handleNavClick: (event: any, { key, url }: any) => void
export let routeChange: (url: string) => void

export const App: React.FC = () => {
  initializeIcons();
  const history = createBrowserHistory();
  handleNavClick = (event: any, link: INavLink | undefined) => {
    event.preventDefault();
    routeChange(link!.url);
  }
  routeChange = (url: string) => {
    history.push(url);
  }
  return (
    <Router history={history}>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row app-container">
          <div className="ms-Grid-col ms-sm3 ms-md2 ms-lg2 ms-xl2 nav-container">
            <NavComponent />
          </div>
          <div className="ms-Grid-col ms-sm9 ms-md10 ms-lg10 ms-xl10 content-container">

            <Card horizontal tokens={{ childrenMargin: 12 }}>
              <Card.Item>
                <Switch>
                  <Route exact path="/"><Redirect to="/home" /></Route>
                  <Route path="/home"><HomeComponent /></Route>
                  <Route path="/upload"><UploaderComponent /></Route>
                </Switch>
              </Card.Item>
            </Card>
          </div>
        </div>
      </div>
    </Router>
  );
}
