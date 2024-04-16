import styled from "styled-components";
import {ICommentProps} from "../components/comment/Comment";
import LikeButton from "./LikeButton";
import {calculateDate} from "src/lib/date";

const CommentInfo = ({comment}: ICommentProps) => {
    const time = calculateDate(comment.created);
    return (
        <StyledCommentInfo>
            <Wrapper>
                <StyledAvatar src={comment.authorInfo?.avatar} />
                <StyledAuthorInfo>
                    <p>{comment.authorInfo?.name}</p>
                    <StyledTime>{time}</StyledTime>
                </StyledAuthorInfo>
            </Wrapper>
            <LikeButton
                quantity={comment.likes}
                onClick={() => console.log("123")}
                disabled={false}
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
    width: 317px;
    height: 68px;
    display: flex;
    align-items: center;
    gap: 20px;
`;

const WrapperLikes = styled.div`
    display: flex;
    align-items: center;
`;

const StyledAvatar = styled.img`
    object-fit: cover;
    object-position: top center;
    border-radius: 50%;
    width: 68px;
    height: 68px;
`;

const StyledAuthorInfo = styled.div`
    width: 229px;
    height: 43px;
    display: flex;
    flex-direction: column;
`;

const StyledTime = styled.p`
    color: #8297ab;
    font-family: "Lato, regular";
    padding-top: 5px;
`;
