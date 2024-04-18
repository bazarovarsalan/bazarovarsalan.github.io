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
        <>
            <WrapperComment>
                <CommentInfo
                    comment={comment}
                    toLikeCommentToggle={toLikeCommentToggle}
                />
                <CommentText text={comment.text} />
            </WrapperComment>
            {comment.children.map((child) => {
                return (
                    <Comment
                        key={child.id}
                        comment={child}
                        toLikeCommentToggle={toLikeCommentToggle}
                    />
                );
            })}
        </>
    );
};

export default Comment;

const WrapperComment = styled.div`
    max-width: 100%;
    max-height: 100%;
    min-height: 125px;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 32px;
    margin-bottom: 20px;
    margin-left: 1.2em;
`;
