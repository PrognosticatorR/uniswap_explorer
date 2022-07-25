## Uniswap explorer

Its a full stack application, that displays historical data of a Uniswap contract, with features, like tx hash, link to block explorer for that hash, parsed values displaying the amounts of assets in human readable form. Let the users login with metamask before querying the data.

- The data is fetched by using SubGraph
- authenticated users only can see the data from this application
- The frontend is hydrated with the backend api
- Todo: add a cache for the queries on the backend side
