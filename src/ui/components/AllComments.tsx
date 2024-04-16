import {useFetchAuthors, useFetchComments} from "../../lib/queries";
import {MouseEventHandler, useEffect, useState} from "react";
import {
    IAuthor,
    ICommentsWithAuthor,
    IPaginationComments,
} from "../../types/types";
import styled from "styled-components";
import Title from "./Title";
import Comment from "./comment/Comment";
import LoadMoreButton from "../widgets/LoadMoreButton";
import {useCallback} from "react";

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

    console.log(commentsWithAuthor);

    const handlerLoadMore = useCallback(
        (event: React.MouseEventHandler<HTMLButtonElement>) => {
            console.log("123");
            const totalPages = commentsData?.pagination?.total_pages;
            if (totalPages && page <= totalPages) {
                return;
            }
            setPage((prev) => prev + 1);
        },
        [commentsData?.pagination?.total_pages],
    );

    return (
        <Wrapper>
            <Title commentsWithAuthor={commentsWithAuthor} />
            {commentsWithAuthor.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
            })}
            <LoadMoreButton onClick={handlerLoadMore} />
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
