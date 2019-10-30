import React from 'react';
import 'typeface-roboto';
import { initializeIcons } from '@uifabric/icons';
import { Router, Switch, Route, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import './App.sass';
import '../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';
import '@trendmicro/react-grid-system/dist/react-grid-system.css';
import { Card } from '@uifabric/react-cards';
// eslint-disable-next-line no-unused-vars
import { INavLink } from 'office-ui-fabric-react';
import { Container, Row, Col, Visible, Hidden } from '@trendmicro/react-grid-system';
import { HomeComponent } from './components/home/home.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { NavComponent } from './components/navigation/nav.component';
import { ClassifiedImagesComponent } from './components/classified-images/classified-images.component';
import { URLs } from './constants';

export let handleNavClick: (event: any, { key, url }: any) => void;
export let routeChange: (url: string) => void;

export const App: React.FC = () => {
  initializeIcons();
  const history = createBrowserHistory();
  handleNavClick = (event: any, link: INavLink | undefined) => {
    event.preventDefault();
    routeChange(link!.url);
  };
  routeChange = (url: string) => {
    history.push(url);
  };
  return (
    <Router history={history}>
      <Visible md sm xs>
        <Container layout="flexbox">
          <Row>
            <Col>
              <Card>
                <Card.Item>
                  <Switch>
                    <Route exact path="/"><Redirect to={URLs.ROUTES.DASHBAORD} /></Route>
                    <Route path={URLs.ROUTES.DASHBAORD}><HomeComponent /></Route>
                    <Route path={URLs.ROUTES.UPLOAD}><UploaderComponent /></Route>
                    <Route path={URLs.ROUTES.CLASSIFIED_IMAGES}><ClassifiedImagesComponent /></Route>
                  </Switch>
                </Card.Item>
              </Card>
            </Col>
          </Row>
        </Container>
      </Visible>
      <Hidden md sm xs>
        <Container layout="flexbox">
          <Row>
            <Col lg={3}>
              <Card>
                <Card.Item>
                  <div style={{ margin: 10 }}>
                    <NavComponent />
                  </div>
                </Card.Item>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Item>
                  <Switch>
                    <Route exact path="/"><Redirect to={URLs.ROUTES.DASHBAORD} /></Route>
                    <Route path={URLs.ROUTES.DASHBAORD}><HomeComponent /></Route>
                    <Route path={URLs.ROUTES.UPLOAD}><UploaderComponent /></Route>
                    <Route path={URLs.ROUTES.CLASSIFIED_IMAGES}><ClassifiedImagesComponent /></Route>
                  </Switch>
                </Card.Item>
              </Card>
            </Col>
          </Row>
        </Container>
      </Hidden>
    </Router>
  );
};
