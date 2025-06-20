import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const ButtonWishList = () => {
    return (
        <StyledWrapper>
            <Link to={"/wishlist"}>
                <button className="button">WishList</button>
            </Link>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .button {
        position: relative;
        width: 120px;
        height: 40px;
        background-color: #000;
        display: flex;
        align-items: center;
        color: white;
        flex-direction: column;
        justify-content: center;
        border: none;
        padding: 12px;
        gap: 12px;
        border-radius: 8px;
        cursor: pointer;
    }

    .button::before {
        content: "";
        position: absolute;
        inset: 0;
        left: -4px;
        top: -1px;
        margin: auto;
        width: 128px;
        height: 48px;
        border-radius: 10px;
        background: linear-gradient(-45deg, #db6b40 0%, #ffffff 100%);
        z-index: -10;
        pointer-events: none;
        transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .button::after {
        content: "";
        z-index: -1;
        position: absolute;
        inset: 0;
        background: linear-gradient(-45deg, #db6b40 0%, #ffffff 100%);
        transform: translate3d(0, 0, 0) scale(0.95);
        filter: blur(20px);
    }

    .button:hover::after {
        filter: blur(30px);
    }

    .button:hover::before {
        transform: rotate(-180deg);
    }

    .button:active::before {
        scale: 0.7;
    }
`;

export default ButtonWishList;
