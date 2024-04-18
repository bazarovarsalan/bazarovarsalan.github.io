import styled from "styled-components";
import RedLikesImg from "../../../assets/images/red-heart.png";
import RedBorderLikesImg from "../../../assets/images/red-border-heart.png";
import React, {useRef} from "react";
import {ICommentWithAuthor} from "src/types/types";

interface ILikes {
    comment: ICommentWithAuthor;
    disabled: boolean;
    toLikeCommentToggle: (id: number, updateLikes: number) => void;
}

const LikeButton = ({comment, disabled, toLikeCommentToggle}: ILikes) => {
    const buttonRef = useRef(false);

    const onClick = (event: React.MouseEvent) => {
        event.preventDefault();
        buttonRef.current = !buttonRef.current;
        const likes = buttonRef.current ? comment.likes + 1 : comment.likes - 1;
        toLikeCommentToggle(comment.id, likes);
    };

    return (
        <LikeButtonWrapper>
            <StyledLikeButton
                disabled={disabled}
                onClick={onClick}
                img={buttonRef.current ? RedLikesImg : RedBorderLikesImg}
            />
            <span>{comment.likes}</span>
        </LikeButtonWrapper>
    );
};

export default LikeButton;

const LikeButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    padding: 3px;
    position: absolute;
    right: 0;
    top: 30px;

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

type StyledLikeButtonProps = {
    img: string;
};

const StyledLikeButton = styled.button<StyledLikeButtonProps>`
    width: 22px;
    height: 20px;
    background-image: url(${(props) => props.img});
    background-size: contain;
    background-repeat: no-repeat;
    border: none;
    background-color: transparent;
    margin: 0 auto;
    cursor: pointer;
`;
