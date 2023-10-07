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
        fields: {}
      },
      Lift: {
        keyFields: ["name"]
      }
    }
  })
});

export default client;
