import {ICommentsWithAuthor} from "src/types/types";
import styled from "styled-components";
import CommentText from "../../widgets/CommentText";
import CommentInfo from "../../widgets/CommentInfo";

export interface ICommentProps {
    comment: ICommentsWithAuthor;
}

const Comment = ({comment}: ICommentProps) => {
    return (
        <WrapperComment>
            <CommentInfo comment={comment} />
            <CommentText text={comment.text} />
        </WrapperComment>
    );
};

export default Comment;

const WrapperComment = styled.div`
    width: 561px;
    height: 125px;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 32px;
`;
