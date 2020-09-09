import React from 'react';
import './App.scss';
import styles from "./App.module.scss";
import autobind from "autobind-decorator";
import {BrowserRouter as Router, HashRouter, Route, Switch, withRouter} from "react-router-dom";
import {ApolloProvider} from "react-apollo";
import {client} from "./index";
import {createBrowserHistory} from 'history';
import logo from './logo.svg';
import { Carousel, Radio, Button } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import SodaMixes from "./components/sodaMixes/SodaMixes";

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

class AppHeaderInner extends React.Component<{}, {
  mode?: string,
  dotPosition: string
}> {
  public constructor(props: any) {
    super(props);
    this.state = {
      mode: 'all',
      dotPosition: "left"
    };
  }

  @autobind
  private handlePositionChange(params: RadioChangeEvent) {
    this.setState({ dotPosition: params.target.value });
  }

  public render(): React.ReactNode {
    const { dotPosition } = this.state;
    return (
        <div className={styles.pageHome}>
          <Carousel className={styles.homeCarousel} dotPosition={dotPosition as any}>
            <div>
              <SodaMixes/>
            </div>
            <div>
              <SodaMixes/>
            </div>
            <div>
              <SodaMixes/>
            </div>
            <div>
              <SodaMixes/>
            </div>
          </Carousel>
        </div>
    );
  };
}

const AppHeader = withRouter(AppHeaderInner);

export const appHistory = createBrowserHistory();

const App: React.FC = () => {
  return (
      <HashRouter history={appHistory}>
        <ApolloProvider client={client}>
          <div className={styles.appHeader}>
            <AppHeader/>
            <Switch>
              {/*-------------------------*/}
              <Route path="/soda-mixes">
                <SodaMixes/>
              </Route>
              {/*-------------------------*/}
              <Route path="/workplace-safety">
              </Route>
              {/*-------------------------*/}
              <Route path="/teacher-panel">
              </Route>
              {/*-------------------------*/}
              <Route path="/registration">
              </Route>
              <Route path="/">
                {/*<CourseList/>*/}
              </Route>
            </Switch>
          </div>
        </ApolloProvider>
      </HashRouter>
  );
};

export default App;
