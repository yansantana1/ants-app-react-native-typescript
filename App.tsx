import { StyleSheet} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import antService from "./src/services/ant-service";
import Home from "./src/Home";

export default function App() {
  return (
    <ApolloProvider client={antService}>
      <Home></Home>
    </ApolloProvider>
  );
}
