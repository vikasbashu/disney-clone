import { useEffect } from "react";
import { useFirebase } from "../context/Firebase";

export const LandingPage = (props) =>{
    const firebase = useFirebase();
    
    return (
        <div>
            <h1>Landing Page</h1>
        </div>
    );
}