import { Container } from "react-bootstrap";
import NotesLoggedInView from "../components/NotesLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import style from "../styles/NotePage.module.css";
import { User } from "../models/users";

interface HomeProps {
    loggedInUser: User | null
}

const Home = ({loggedInUser}: HomeProps) => {
    return (

        <Container className={style.notePage}>
            <>
                {
                    loggedInUser
                        ? <NotesLoggedInView />
                        : <NotesPageLoggedOutView />
                }
            </>
        </Container>
    );
}

export default Home;