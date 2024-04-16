import {ICommentsWithAuthor} from "src/types/types";
import styled from "styled-components";
import TitleLikes from "../widgets/TitleLikes";
import {wordHelper} from "../../lib/wordHelper";

interface ITitle {
    commentsWithAuthor: ICommentsWithAuthor[];
}

const Title = ({commentsWithAuthor}: ITitle) => {
    const totalLikes = commentsWithAuthor.reduce(
        (acc, commment) => acc + commment.likes,
        0,
    );

    const commentsQuantity = wordHelper(commentsWithAuthor.length);

    return (
        <StyledTitle>
            <StyledCommentsQuantity>{commentsQuantity}</StyledCommentsQuantity>
            <TitleLikes>{totalLikes}</TitleLikes>
        </StyledTitle>
    );
};

export default Title;

const StyledTitle = styled.div`
    width: 100%;
    height: 40px;
    padding: 0 5px 10px 5px;
    border-bottom: 1px solid #767676;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
`;

const StyledCommentsQuantity = styled.p`
    font-size: 16px;
    font-family: "Lato, bold";
`;
