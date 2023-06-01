import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginModalForm from './components/LoginModalForm';
import NavBar from './components/NavBar';
import SignUpModalForm from './components/SignUpModalForm';
import { User } from "./models/users";
import * as UsersApi from "./network/users_api";
import pageStyle from "./styles/App.module.css"
function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  const [showSignUpModel, setShowSignUpModel] = useState(false)
  const [showLoginUpModel, setshowLoginUpModel] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UsersApi.getLoggedInUsers()
        setLoggedInUser(user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoggedInUser()
  }, [])

  return (
    
    <BrowserRouter>
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => setShowSignUpModel(true)}
        onLogInClicked={() => setshowLoginUpModel(true)}
        onLogOutClicked={() => setLoggedInUser(null)}
      />
        <Container className={pageStyle.pageContainer}>
          <Routes>
            <Route 
              path="/"
              element={<Home loggedInUser={loggedInUser}/>}
            />
          </Routes>
        </Container>
      {
        showSignUpModel &&
        <SignUpModalForm
          onDismiss={() => setShowSignUpModel(false)}
          onSignUpSuccessfull={(user) => {
            setLoggedInUser(user)
            setShowSignUpModel(false)
          }}
        />
      }

      {
        showLoginUpModel &&
        <LoginModalForm
          onDismiss={() => setshowLoginUpModel(false)}
          onLoginSuccesful={(user) => {
            setLoggedInUser(user)
            setshowLoginUpModel(false)
          }}
        />
      }
    </div>
    </BrowserRouter>
  );
}

export default App;
