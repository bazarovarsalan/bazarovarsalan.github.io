import {ICommentWithAuthor} from "src/types/types";
import styled from "styled-components";
import CommentText from "./CommentText";
import CommentInfo from "../../components/comment/CommentInfo";

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
            {comment.children.length > 0 &&
                comment.children.map((child) => {
                    return (
                        <WrapperChildComment key={child.id}>
                            <Comment
                                key={child.id}
                                comment={child}
                                toLikeCommentToggle={toLikeCommentToggle}
                            />
                        </WrapperChildComment>
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
`;

const WrapperChildComment = styled.div`
    padding-left: 33px;

    @media (max-width: 768px) {
        padding-left: 20px;
    }
`;
