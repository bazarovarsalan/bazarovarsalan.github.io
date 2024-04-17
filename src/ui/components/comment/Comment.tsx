import {ICommentWithAuthor} from "src/types/types";
import styled from "styled-components";
import CommentText from "../../widgets/CommentText";
import CommentInfo from "../../widgets/CommentInfo";

export interface ICommentProps {
    comment: ICommentWithAuthor;
    toLikeCommentToggle: (id: number, updateLikes: number) => void;
}

const Comment = ({comment, toLikeCommentToggle}: ICommentProps) => {
    return (
        <WrapperComment>
            <CommentInfo
                comment={comment}
                toLikeCommentToggle={toLikeCommentToggle}
            />
            <CommentText text={comment.text} />
            {comment.children.map((child) => {
                return (
                    <Comment
                        key={child.id}
                        comment={child}
                        toLikeCommentToggle={toLikeCommentToggle}
                    />
                );
            })}
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
