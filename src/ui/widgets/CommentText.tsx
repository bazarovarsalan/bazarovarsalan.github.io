import styled from "styled-components";

interface ICommentTextProps {
    text: string;
}

const CommentText = ({text}: ICommentTextProps) => {
    return <StyledCommentText>{text}</StyledCommentText>;
};

export default CommentText;

const StyledCommentText = styled.span`
    width: 100%;
    min-height: 57px;
    max-height: 100%;
    padding-left: 88px;
    display: inline-flex;
    word-break: break-all;

    @media (max-width: 480px) {
        width: 17rem;
        padding-left: 56px;
        font-size: 14px;
    }
`;
