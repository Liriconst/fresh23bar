import React from 'react';
import './App.scss';
import styles from "./App.module.scss";
import autobind from "autobind-decorator";
import {BrowserRouter as Router, HashRouter, Route, Switch, withRouter, Link} from "react-router-dom";
import {ApolloProvider} from "react-apollo";
import {client} from "./index";
import {createHashHistory} from 'history';
import { Carousel, Radio, Button } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import SodaMixes from "./components/sodaMixes/SodaMixes";
import Smoothies from "./components/smoothies/Smoothies";
import Milkshakes from "./components/milkshakes/Milkshakes";
import Freshes from "./components/freshes/Freshes";
import ExoticDrinks from "./components/exoticDrinks/ExoticDrinks";
import HotDrinks from "./components/hotDrinks/HotDrinks";
import IceCreams from "./components/iceCreams/IceCreams";
import {Home} from "./components/home/Home";

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
          <Link to="/soda-mixes">Soda</Link>
          <Link to="/smoothies">Smoothie</Link>
          <Link to="/freshes">Fresh</Link>
          <Link to="/milkshakes">Milkshake</Link>
          <Link to="/exotic-drinks">Exotic</Link>
          <Link to="/hot-drinks">Hot</Link>
          <Link to="/ice-creams">Ice cream</Link>
          <Link to="/">Home</Link>
          {/*<Carousel className="homeCarousel" dotPosition={dotPosition as any}>*/}
          {/*  <smoothies/>*/}
          {/*  <div>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*  </div>*/}
          {/*</Carousel>*/}
        </div>
    );
  };
}

const AppHeader = withRouter(AppHeaderInner);

export const appHistory = createHashHistory();

const App: React.FC = () => {
  return (
      <HashRouter history={appHistory}>
          <ApolloProvider client={client}>
              <div className={styles.appHeader}>
                  {(window.location.href === "http://localhost:3000/#/") ? <span/> : <AppHeader/>}
                  <Switch>
                    {/*-------------------------*/}
                    <Route path="/soda-mixes">
                      <SodaMixes/>
                    </Route>
                    <Route path="/smoothies">
                      <Smoothies/>
                    </Route>
                    <Route path="/freshes">
                      <Freshes/>
                    </Route>
                    <Route path="/milkshakes">
                      <Milkshakes/>
                    </Route>
                    <Route path="/exotic-drinks">
                      <ExoticDrinks/>
                    </Route>
                    <Route path="/hot-drinks">
                      <HotDrinks/>
                    </Route>
                    <Route path="/ice-creams">
                      <IceCreams/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                  </Switch>
                  {(window.location.href === "http://localhost:3000/#/") ? <span/> :
                      <div className={styles.appHeaderEndDt}>
                          <span className={styles.appHeaderEndName1Dt}><span className={styles.appHeaderEndFontDt}>крафтовые напитки</span></span>
                          <span className={styles.appHeaderEndImgDt}>
                              <img alt="icon" src="/static/svg/logo.svg"/>
                          </span>
                          <span className={styles.appHeaderEndName2Dt}><span className={styles.appHeaderEndFontDt}>пляжный фреш-бар</span></span>
                      </div>
                  }
              </div>
        </ApolloProvider>
      </HashRouter>
  );
};

export default App;
