import styled from "styled-components";
import LikesImg from "../../assets/images/grey-heart.png";

interface ITitleLikes {
    children: number;
}

const TitleLikes = ({children}: ITitleLikes) => {
    return (
        <LikesWrapper>
            <LikesButton />
            <LikesQuantity>{children}</LikesQuantity>
        </LikesWrapper>
    );
};

export default TitleLikes;

const LikesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 70px;
    height: 23px;
    gap: 7px;
    padding: 3px;
    position: absolute;
    right: 0;
`;

const LikesButton = styled.button`
    width: 22px;
    height: 20px;
    background-image: url(${LikesImg});
    background-size: contain;
    background-repeat: no-repeat;
    border: none;
    background-color: transparent;
    margin: 0 auto;
`;

const LikesQuantity = styled.span`
    width: 70%;
`;
