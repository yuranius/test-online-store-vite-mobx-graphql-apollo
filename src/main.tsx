import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {createUploadLink} from "apollo-upload-client";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {CSSTransition} from "react-transition-group";
import Toasts from "./components/ui/toasts/Toasts";



const link = createUploadLink ({
	uri: 'https://parseapi.back4app.com/graphql',
	headers: {
		"X-Parse-Application-Id": "kkWwjLM6jwGw4cW1VeN7NoLuuAWWCcQOT3nwfcZD",
		"X-Parse-Javascript-Key": "F41sCleZ0JFerYg6Kjg4zHU94Fk0hmGAu3yI6VW7",
	},
})

const client  = new ApolloClient({
	link,
	cache: new InMemoryCache(),
})




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)
