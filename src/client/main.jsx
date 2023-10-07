import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { generatePersistedQueryIdsFromManifest } from "@apollo/persisted-query-lists";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";

const persistedQueryLink = createPersistedQueryLink(
  generatePersistedQueryIdsFromManifest({
    loadManifest: () =>
      import("../../persisted-query-manifest.json")
  })
);

const httpLink = new HttpLink({
  uri: "https://snowtooth.fly.dev"
});

const wsLink = new GraphQLWsLink(
  createClient({ url: "wss://snowtooth.fly.dev" })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: persistedQueryLink.concat(splitLink),
  cache: new InMemoryCache({
    typePolicies: {
      Hotel: {
        keyFields: ["name"],
        fields: {
          avgCost: {
            read(avgCost) {
              return avgCost * 0.25;
            }
          }
        }
      },
      Lift: {
        keyFields: ["name"]
      }
    }
  })
});

export default client;
