import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MusicState from "./context/music/MusicState";
import PlayerState from "./context/player/PlayerState";
import MusicAppBar from "./components/header/MusicAppBar";
import "../src/css/styles.css";
import { Home } from "./components/sections/Home";
import { Trending } from "./components/sections/Trending";
import { Playlist } from "./components/sections/Playlist";
import { AudioPlayer } from "./components/player/AudioPlayer";
import { Search } from "./components/sections/Search";
import { Artist } from "./components/sections/Artist";
import { Album } from "./components/sections/Album";
import ScrollToTop from "./components/routing/ScrollToTop";
import { Explore } from "./components/sections/Explore";
import { NewReleases } from "./components/sections/NewReleases";
import { MoodsAndGenres } from "./components/sections/MoodsAndGenres";
import { MoodsAndGenresData } from "./components/sections/MoodAndGenresData";
// import Queue from "./components/player/playlist/Queue";
import { Library } from "./components/sections/Library";
import DbState from "./context/db/DbState";

function App() {
  return (
    <DbState>
      <MusicState>
        <PlayerState>
          <Router>
            <ScrollToTop>
              <Fragment>
                <MusicAppBar />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/watch/:id">
                    <div></div>
                  </Route>
                  <Route exact path="/playlist/:id" component={Playlist} />
                  <Route exact path="/artist/:id" component={Artist} />
                  <Route exact path="/album/:id" component={Album} />
                  <Route exact path="/search/:query" component={Search} />
                  <Route exact path="/trending" component={Trending} />
                  <Route exact path="/library" component={Library} />
                  <Route exact path="/explore" component={Explore} />
                  <Route exact path="/new_releases" component={NewReleases} />
                  <Route
                    exact
                    path="/mood_and_genres"
                    component={MoodsAndGenres}
                  />
                  <Route
                    exact
                    path="/mood_and_genres_data/:id"
                    component={MoodsAndGenresData}
                  />
                </Switch>
                <AudioPlayer />
              </Fragment>
            </ScrollToTop>
          </Router>
        </PlayerState>
      </MusicState>
    </DbState>
  );
}

export default App;
