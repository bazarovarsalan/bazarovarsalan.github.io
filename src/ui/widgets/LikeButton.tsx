import styled from "styled-components";
import RedLikesImg from "../../assets/images/red-heart.png";
import RedBorderLikesImg from "../../assets/images/red-border-heart.png";

interface ILikes {
    quantity: number;
    onClick: () => void;
    disabled: boolean;
}

const LikeButton = ({quantity, onClick, disabled}: ILikes) => {
    return (
        <LikeButtonWrapper>
            <StyledLikeButton onClick={onClick} disabled={disabled} />
            <span>{quantity}</span>
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
`;

const StyledLikeButton = styled.button`
    width: 22px;
    height: 20px;
    background-image: url(${RedLikesImg});
    background-size: contain;
    background-repeat: no-repeat;
    border: none;
    background-color: transparent;
    margin: 0 auto;
    cursor: pointer;
`;
