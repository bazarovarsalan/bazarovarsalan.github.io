import {useFetchAuthors, useFetchComments} from "../../lib/queries";
import {useEffect, useState} from "react";
import {
    IAuthor,
    ICommentsWithAuthor,
    IPaginationComments,
} from "../../types/types";
import styled from "styled-components";
import Title from "./Title";
import Comment from "./comment/Comment";
import LoadMoreButton from "../widgets/LoadMoreButton";

const AllComments = () => {
    const [page, setPage] = useState<number>(1);

    const {
        data: authorsData,
        isLoading: authorsIsLoading,
        isError: authorsIsError,
        isSuccess: authorsIsSuccess,
    } = useFetchAuthors();

    const {
        data: commentsData,
        isLoading: commentsIsLoading,
        isError: commentsIsError,
        isSuccess: commentsIsSuccess,
    } = useFetchComments(page);

    const [commentsWithAuthor, setCommentsWithAuthor] = useState<
        ICommentsWithAuthor[]
    >([]);

    const [isLoadingCommentsWithAuthor, setIsLoadingCommentsWithAuthor] =
        useState(false);
    const [isErrorCommentsWithAuthor, setIsErrorCommentsWithAuthor] =
        useState(false);

    const combineCommentsWithAuthor = (
        authors: IAuthor[],
        comments: IPaginationComments,
    ) => {
        const result = comments?.data.map((comment) => {
            return {
                ...comment,
                authorInfo: authors.find(
                    (author) => author.id === comment.author,
                ),
            };
        });
        return result;
    };

    useEffect(() => {
        setIsLoadingCommentsWithAuthor(commentsIsLoading || authorsIsLoading);
        setIsErrorCommentsWithAuthor(commentsIsError || authorsIsError);
    }, [commentsIsLoading, authorsIsLoading, commentsIsError, authorsIsError]);

    useEffect(() => {
        if (commentsIsSuccess && authorsIsSuccess) {
            const combined = combineCommentsWithAuthor(
                authorsData,
                commentsData,
            );
            setCommentsWithAuthor((prev) => [...prev, ...combined]);
        }
    }, [authorsData, commentsData, page]);

    return (
        <Wrapper>
            <Title commentsWithAuthor={commentsWithAuthor} />
            {commentsWithAuthor.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
            })}
            <LoadMoreButton />
        </Wrapper>
    );
};

export default AllComments;

const Wrapper = styled.div`
    width: 562px;
    height: 100vh;
    margin-top: 5rem;
    position: relative;
    padding-bottom: 30px;
`;
