import "./Register.css"

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PageRegister() {
    let [userName, setUserName] = useState("")
    let [password, setPassword] = useState("") 
    let [errorMasage, setErrorMasage] = useState("") 
    let [userEmail, setUserEmail] = useState("")
    let [nameOfSchool, setNameOfSchool] = useState("mySchool") 

    let navigate = useNavigate();


    function mySubmit() {
        let data = {name: userName, password: password, nameSchool: nameOfSchool, email: userEmail}

        axios.post("http://localhost:4000/system/register", data)
            .then(
                (data)=>{
                    alert(`data: ${data.data} \n status: ${data.status}`)
                    navigate("/login")
                    setErrorMasage("")
                },
                (err) => {
                    setErrorMasage(err.response.data)
                }    
            )
        ;
    }
    

    return(
        <div className="PageRegister">
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <h2 className="button h2__">register</h2>
                        <form action="" className="from" onSubmit={(e)=>{
                            e.preventDefault()
                            mySubmit()
                        }}>
                            <p className="errorMasage">{errorMasage &&<span className="_errorMasage">* </span>} {errorMasage}</p>

                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input required  onChange={(e)=>{setUserName(e.target.value)}} value={userName} type={"text"} className="login__input" placeholder="User name"/>
                            </div>
                            <div  className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input required onChange={(e)=>{setPassword(e.target.value)}} value={password} type={"password"} className="login__input" placeholder="Password"/>
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input required  onChange={(e)=>{setUserEmail(e.target.value)}} value={userEmail} type={"email"} className="login__input" placeholder="Email"/>
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input required value={nameOfSchool} type={"text"} className="login__input" placeholder="Name of school / Email"/>
                            </div>
                            
                            <button className="button login__submit">
                                <span className="button__text">register Now</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>	

                            <button className="button toRegister_toLogin__button" onClick={()=>{navigate("/login")}}>to Log In </button>				
                        </form>
                    </div>

                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>		
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>		
                </div>
            </div>
        </div>
    )
}

export default PageRegister