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
    display: block;
`;
