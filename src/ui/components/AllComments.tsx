import {useFetchAuthors, useFetchComments} from "../../lib/queries";
import React, {MouseEventHandler, useEffect, useState} from "react";
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

    const combineCommentsWithAuthor = useCallback(
        (authors: IAuthor[], comments: IPaginationComments) => {
            const result = comments?.data.map((comment) => {
                return {
                    ...comment,
                    authorInfo: authors.find(
                        (author) => author.id === comment.author,
                    ),
                    likes: comment.likes < 0 ? 0 : comment.likes,
                };
            });

            return result.sort((a: any, b: any) => {
                var dateA: Date = new Date(a.created);
                var dateB: Date = new Date(b.created);
                return Number(dateB) - Number(dateA);
            });
        },
        [commentsData, authorsData],
    );

    const [disabledLoadMore, setDisabledLoadMore] = useState(false);

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

    const handlerLoadMore = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();
            const totalPages = commentsData?.pagination?.total_pages;
            if (totalPages && page >= totalPages) {
                setDisabledLoadMore(true);
            } else {
                setDisabledLoadMore(false);
            }
            setPage((prev) => prev + 1);
        },
        [commentsData?.pagination?.total_pages],
    );

    const toLikeCommentToggle = (id: number, updateLikes: number): void => {
        setCommentsWithAuthor((prev) =>
            prev.map((comment) =>
                comment.id === id ? {...comment, likes: updateLikes} : comment,
            ),
        );
    };

    const totalLikes = commentsWithAuthor.reduce(
        (acc, commment) => acc + commment.likes,
        0,
    );

    return (
        <Wrapper>
            <Title
                commentsWithAuthor={commentsWithAuthor}
                totalLikes={totalLikes}
            />
            {commentsWithAuthor.map((comment) => {
                console.log(comment.likes);
                return (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        toLikeCommentToggle={toLikeCommentToggle}
                    />
                );
            })}
            <LoadMoreButton
                onClick={handlerLoadMore}
                disabled={disabledLoadMore}
            />
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
