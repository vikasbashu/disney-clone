import { useEffect } from "react";
import styled from "styled-components";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { ImageSlider } from "./ImageSlider";
import { Viewers } from "./Viewers";
import { Recommended } from "./Recommends";

const Home = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const user = firebase.userLoginStatus();
    useEffect(()=>{
        ! user && navigate("/");
    }, [user, navigate]);
    return (
        
            <Container>
                <ImageSlider/>
                <Viewers/>
                <Recommended/>
            </Container>
        
    );
}

const Container = styled.main`
    position: relative;
    display: block;
    top: 72px;
    overflow-x: hidden;
    min-height: calc(100vh - 250px);
    padding: 0 calc(3.5vw + 5px);
    &: after{
        background: url("images/png/home-background.png") center no-repeat fixed;
        content:"";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }
`;

export default Home;