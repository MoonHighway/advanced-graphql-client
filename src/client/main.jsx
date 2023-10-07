import {
  ApolloClient,
  InMemoryCache,
  HttpLink
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://snowtooth.fly.dev"
});

const client = new ApolloClient({
  link: httpLink,
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
