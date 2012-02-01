# StockWatcher

This is test application that works with yahoo CSV files for watching actual stock information for selected tickers.

You can see it at running at [nihique.no.de](http://nihique.no.de)

## Additional info

I have created this as my personal pet project that should help me to learn more about JavaScript development on both server side and client side.

## Technical overview

- Used technologies:
    - node.js
    - node.js modules
      - express: sinatra like web framework
      - request: http client (used for downloading Yahoo's CSV files)
    - ember.js: client side MVC framework
    - ember-data: REST persistence layer for ember.js
    - csvjson: client side CSV parser
    - bootstrap (from twitter)