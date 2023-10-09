import { useEffect } from "react";
import styled from "styled-components";
import { useFirebase } from "../context/Firebase";
import { selectUserName,
selectUserPhoto,
setSignOutState,
setUserLoginDetails } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = (props) => {

    const firebase = useFirebase();
    const dispatch = useDispatch();
    const username = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    const navigate = useNavigate();
    useEffect(() => {
        const resp = firebase.userLoginStatus();
        if(resp){
            setUser(resp);
            navigate("/home");
        }
    },[username, firebase, navigate]);
    const handleAuth = async () =>{
       if(!username){
            try{
                firebase.signUpWithGoogle();
                const resp = firebase.userLoginStatus()
                setUser(resp);

            }catch(error){
                console.log(error);
                alert(error.message);
            }
       }else{
            try{
                firebase.logOut().then((ev)=>{
                    dispatch(setSignOutState());
                    navigate("/");
                });
            }catch(error){
                alert(error.message);
            }
       }
    }
    const setUser = (user) => {
        user && dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }));
    }
    return (
        <Nav>
        <Logo><img src="/images/svg/logo.svg" alt="logo"/></Logo>
        {
            ! username ? <Login onClick={handleAuth}>Login</Login> : <>
            <NavMenu>
        <a href="/home">
            <img src="/images/svg/home-icon.svg" alt="Home"/>
            <span>HOME</span>
        </a>
        <a href="/search">
            <img src="/images/svg/search-icon.svg" alt="Search"/>
            <span>SEARCH</span>
        </a>
        <a href="/watchlist">
            <img src="/images/svg/watchlist-icon.svg" alt="Watchlist"/>
            <span>WATCHLIST</span>
        </a>
        <a href="/originals">
            <img src="/images/svg/original-icon.svg" alt="Originals"/>
            <span>ORIGINALS</span>
        </a>
        <a href="/movies">
            <img src="/images/svg/movie-icon.svg" alt="Movies"/>
            <span>MOVIES</span>
        </a>
        <a href="/series">
            <img src="/images/svg/series-icon.svg" alt="Series"/>
            <span>SERIES</span>
        </a>
    </NavMenu>
    <UserImg src={userPhoto} alt={username}/>
    <SignOut>
        <DropDown>
            <span onClick={handleAuth}>Sign Out</span>
        </DropDown>
    </SignOut>
    </>
        }
        
        
    </Nav>
    );
};
const Nav = styled.nav`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;
const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    cursor: pointer;
    font-size: 0;
    display: inline-block;
    img{
        display: block;
        width: 100%;
    }
`;

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content:  flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;
    margin-left: 25px;

    a{
        display:flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer; 

        img{
            height: 20px;
            width: 20px;
            min-width: 20px;
            z-index: auto;
        }

        span{
            color: rgb(249, 249, 249);
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;
            
            &:before{
                background-color: rgb(249, 249, 249);
                border-radius: 0px 0px 4px 4px;
                bottom: -6px;
                content: "";
                height: 2px;
                left: 0px;
                opacity: 0;
                position: absolute;
                right: 0px;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
                visibility: hidden;
                width: auto;
            }
        }
        &:hover{
            span::before{
                transform: scaleX(1);
                visibility: visible;
                opacity: 1 !important;
            }
        }
    }

    @media (max-width: 768px){
        display: none;
    }
`;

const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    cursor: pointer;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;

    &:hover{
        background-color: #f9f9f9 ;
        color: #000;
        border-radius: transparent;
    }
`;
const UserImg = styled.img`
    height: 100%;
    cursor: pointer;
`;
const DropDown = styled.div`
    position: absoulte;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    border-radius: 4px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
    padding; 10px;
`;
const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    display: flex;

    ${UserImg}{
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
    &:hover{
        ${DropDown}{
            opacity: 1;
            transition-duration: 1s;
        }
    }
    `;

export default Header;
