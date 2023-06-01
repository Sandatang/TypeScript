import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/users";
import * as UsersApi from "../network/users_api"

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void
}


const NavBarLoggedInView = ({user, onLogoutSuccessful}: NavBarLoggedInViewProps) => {
    
    async function logout(){
        try {
            await UsersApi.logOut()
            onLogoutSuccessful()
        } catch (error) {
            console.error(error)
        }
    }

    return ( 
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
     );
}
 
export default NavBarLoggedInView;