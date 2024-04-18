import styled from "styled-components";
import {ICommentProps} from "./Comment";
import LikeButton from "./LikeButton";
import {calculateDate} from "src/lib/date";

const CommentInfo = ({comment, toLikeCommentToggle}: ICommentProps) => {
    const timeCreatedComment = calculateDate(comment.created);

    return (
        <StyledCommentInfo>
            <Wrapper>
                <StyledAvatar src={comment.authorInfo?.avatar} />
                <StyledAuthorInfo>
                    <p>{comment.authorInfo?.name}</p>
                    <StyledTime>{timeCreatedComment}</StyledTime>
                </StyledAuthorInfo>
            </Wrapper>
            <LikeButton
                comment={comment}
                disabled={false}
                toLikeCommentToggle={toLikeCommentToggle}
            />
        </StyledCommentInfo>
    );
};

export default CommentInfo;

const StyledCommentInfo = styled.div`
    width: 100%;
    height: 68px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 5.25rem;
    display: flex;
    align-items: center;
    gap: 20px;
`;

const StyledAvatar = styled.img`
    object-fit: cover;
    object-position: top center;
    border-radius: 50%;
    width: 4.25rem;
    height: 4.25rem;
    @media (max-width: 480px) {
        width: 2.5rem;
        height: 2.5rem;
    }
`;

const StyledAuthorInfo = styled.div`
    width: 14.313rem;
    height: 70px;
    display: flex;
    flex-direction: column;
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

const StyledTime = styled.p`
    color: #8297ab;
    padding-top: 5px;
    height: 20px;
    width: 100%;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 14;
    font-style: normal;
`;
