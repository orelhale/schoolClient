import "./Login.css"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PageLogin() {
    let [userEmail, setUserEmail] = useState("")
    let [password, setPassword] = useState("")
    let [nameOfSchool, setNameOfSchool] = useState("mySchoolNew")

    let [errorMasage, setErrorMasage] = useState("")

    let navigate = useNavigate();


    function mySubmit(obj) {
        let data = obj || { email: userEmail, password: password, nameOfSchool: nameOfSchool }

        axios.post("http://localhost:4000/system/login", data)
            .then(
                (data) => {
                    // console.log(data.data);
                    localStorage.tokenOfUser = JSON.stringify(data.data.token)
                    setErrorMasage("")
                    setUserEmail("")
                    setPassword("")
                    let location = data.data.level_permission
                    navigate("/" + location);
                }
                , (err) => {
                    setErrorMasage(err.response.data)
                }
            )
            ;
    }


    return (
        <div className="PageLogin">
            <div>
                <button onClick={() => mySubmit({ email: "orel@gmail.com", password: "1", nameOfSchool: "nameOfSchool" })}>admin</button>
                <button onClick={() => mySubmit({ email: "shira@gmail.com", password: "1", nameOfSchool: "nameOfSchool" })}>teacher</button>
                <button onClick={() => mySubmit({ email: "aliya@gmail.com", password: "1", nameOfSchool: "nameOfSchool" })}>not access</button>
                <button onClick={() => mySubmit({ email: "aviya@gmail.com", password: "1", nameOfSchool: "nameOfSchool" })}>other</button>
                <button onClick={() => { navigate("/test") }}>test</button>
            </div>
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <h2 className="button h2__">Log In</h2>
                        <form action="" className="from" onSubmit={(e) => {
                            e.preventDefault()
                            mySubmit()
                        }}>
                            <p className="errorMasage">{errorMasage && <span className="_errorMasage">* </span>} {errorMasage}</p>
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input required onChange={(e) => { setUserEmail(e.target.value) }} value={userEmail} type={"text"} className="login__input" placeholder="Email" />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input required onChange={(e) => { setPassword(e.target.value) }} value={password} type={"password"} className="login__input" placeholder="Password" />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input required value={nameOfSchool} type={"text"} className="login__input" placeholder="Name of school" />
                            </div>

                            <button className="button login__submit">
                                <span className="button__text">Log In Now</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>

                            <button className="button toRegister_toLogin__button" onClick={() => { navigate('/registration') }} >To Register</button>
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

export default PageLogin