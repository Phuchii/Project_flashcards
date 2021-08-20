import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Deck/Home";
import CreateDeck from "./Deck/CreateDeck";
import Deck from "./Deck/Deck";
import EditDeck from "./Deck/EditDeck";
import Study from "./Cards/Study";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";

function Layout() {
  const url = "/decks/";
  const [numDecks, setNumDecks] = useState(0);

  const updateDecks = (value) => {
    setNumDecks(() => numDecks + value);
  };

  //Route List
  return (
    <>
      <Header />
      <main className="container">
        <Switch>
          <Route exact={true} path="/">
            <Home numDecks={numDecks} updateDecks={updateDecks} />
          </Route>
          <Route path={`${url}:deckId/study`}>
            <Study />
          </Route>
          <Route path={`${url}new`}>
            <CreateDeck />
          </Route>
          <Route path={`${url}:deckId/edit`}>
            <EditDeck />
          </Route>
          <Route exact={true} path={`${url}:deckId`}>
            <Deck updateDecks={updateDecks} />
          </Route>
          <Route path={`${url}:deckId/cards/:cardId/edit`}>
            <EditCard />
          </Route>
          <Route path={`${url}:deckId/cards/new`}>
            <AddCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default Layout;
