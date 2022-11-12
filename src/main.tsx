import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {createUploadLink} from "apollo-upload-client";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import UserStore from "./store/UserStore";
import {IContext} from "./types/contextTypes";


let token = localStorage.length ? localStorage.getItem('token') : ''

const link = createUploadLink({
	uri: 'https://parseapi.back4app.com/graphql',
	headers: {
		"X-Parse-Application-Id": "kkWwjLM6jwGw4cW1VeN7NoLuuAWWCcQOT3nwfcZD",
		"X-Parse-Javascript-Key": "F41sCleZ0JFerYg6Kjg4zHU94Fk0hmGAu3yI6VW7",
		"X-Parse-Session-Token": token
	},
})

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
})


// @ts-ignore
export const Context = createContext<IContext>()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		<Context.Provider value={{ user: new UserStore()	}}>
			<ApolloProvider client={client}>
				<App/>
			</ApolloProvider>
		</Context.Provider>
)
