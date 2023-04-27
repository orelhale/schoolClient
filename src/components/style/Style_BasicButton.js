// מקור   https://react.school/ui/button

import styled from "styled-components";

function Style_BasicButton(props) {
    const Button = styled.button`
        background-color: #fff;
        color: #1976d2;
        font-size: 20px;
        padding: 5px 30px;
        border-radius: 10px ;
        // margin: 10px 0px;
        cursor: pointer;
        border: #1976d2 1px solid;
    `;

    return(
        <Button onClick={props.onClick}>{props.text}</Button>
    )
}

export default Style_BasicButton;