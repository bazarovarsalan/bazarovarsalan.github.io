import styled from "styled-components";
import TitleLikes from "../widgets/TitleLikes";
import {wordHelper} from "../../lib/wordHelper";
import {IComment} from "../../types/types";
import {useEffect, useState} from "react";

interface ITitle {
    comments: IComment[];
    totalLikes: number;
}

const Title = ({comments, totalLikes}: ITitle) => {
    const [totalComments, setTotalComments] = useState(0);

    useEffect(() => {
        setTotalComments((prev) => prev + comments.length);
    }, [comments]);

    const commentsQuantity = wordHelper(totalComments, [
        " комментарий",
        " комментария",
        " комментариев",
    ]);

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

    @media (max-width: 768px) {
        width: 25.5rem;
    }

    @media (max-width: 480px) {
        width: 17rem;
    }
`;

const StyledCommentsQuantity = styled.p`
    font-size: 16px;
    font-family: "Lato", sans-serif;
    font-weight: bold;
`;
