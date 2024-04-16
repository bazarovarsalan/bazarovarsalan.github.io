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
    padding-left: 88px;
    display: inline-flex;
`;
