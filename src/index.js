import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { AzureAD, AuthenticationState } from 'react-aad-msal';
// import { authProvider } from './authProvider';


ReactDOM.render(

    <React.StrictMode>
      <App email = {"email@gmail.com"} username = {"Username"}/>
      {/* <AzureAD provider={authProvider} forceLogin={true}>
      {({ login, logout, authenticationState, error, accountInfo }) => {
        
        switch (authenticationState) {
          
          case AuthenticationState.Authenticated:
            var email=accountInfo.account.userName;
            var username = accountInfo.account.name;
            return (
              <App email = {email} username = {username}/>
            );
          case AuthenticationState.Unauthenticated:
            return (
              <div>
                {error && (
                  <p>
                    <span>
                      An error occured during authentication, please try
                      again!
                    </span>
                  </p>
                )}
                <p>
                  <span>Click here to login!</span>
                  <button onClick={login}>Login</button>
                </p>
              </div>
            );
          default:
            return(<p>Refresh the page</p>);
        }
      }}
      </AzureAD> */}
    </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
