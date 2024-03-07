import { useParams, useNavigate } from "react-router-dom"
import Card from "./Card";
import Button from "./Button";


function PostDetails() {

    let {postId} = useParams();
    const navigate = useNavigate(); // useNavigate() hook je pogodan kada ka drugim rutama hocemo da odemo programaticno (a ne kroz Link ili NavLink elemente kao sto smo radili)

    const goToAboutPage = () => {
        navigate('/about');
    }

    return (
        <Card darkMode={true}>
            <h1>Post ID: {postId}</h1>
            {/* 
                h3 i p ispod u praksi bi zavisili od API poziva koji uputimo ka serveru i koji bi nam podatke 
                o odredjenom Post-u dobavio na osnovu ID-a koji dobije kroz useParams() hook, odnosno kroz postId 
            */}
            <h3>Post written by: Pera Peric</h3>
            <p>Post published at: 01.01.2024.</p>

            <Button 
                isDisabled={false}
                type={'button'}
                children={'Find out more about our website'}
                onClick={goToAboutPage}
            />
        </Card>
    )
}

export default PostDetails