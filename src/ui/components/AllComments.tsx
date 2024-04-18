import {useFetchAuthors, useFetchComments} from "../../lib/queries";
import React, {useEffect, useState} from "react";
import {
    IAuthor,
    ICommentWithAuthor,
    IPaginationComments,
} from "../../types/types";
import styled from "styled-components";
import Title from "./Title";
import Comment from "./comment/Comment";
import LoadMoreButton from "../widgets/LoadMoreButton";
import {useCallback} from "react";
import {Loader} from "../widgets/Loader";
import ErrorComponent from "./ErrorComponent";

const combineCommentsWithAuthor = (
    authors: IAuthor[],
    comments: IPaginationComments,
) => {
    const result: ICommentWithAuthor[] = comments?.data.map((comment) => {
        return {
            ...comment,
            authorInfo: authors.find((author) => author.id === comment.author),
            likes: comment.likes < 0 ? 0 : comment.likes,
            children: [],
        };
    });

    const sortedComments = toSortComments(result);

    const map = new Map<number | null, ICommentWithAuthor[]>();

    for (const comment of sortedComments) {
        if (map.has(comment.parent)) {
            map.get(comment.parent)?.push(comment);
        } else {
            map.set(comment.parent, [comment]);
        }
    }

    for (const comment of sortedComments) {
        comment.children = map.get(comment.id) || [];
    }

    const roots = map.get(null) || [];

    return roots;
};

function toSortComments(comments: ICommentWithAuthor[]) {
    const result = comments.sort((a: any, b: any) => {
        var dateA: Date = new Date(a.created);
        var dateB: Date = new Date(b.created);
        return Number(dateB) - Number(dateA);
    });
    return result;
}

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
        ICommentWithAuthor[]
    >([]);

    const [isLoadingCommentsWithAuthor, setIsLoadingCommentsWithAuthor] =
        useState(false);
    const [isErrorCommentsWithAuthor, setIsErrorCommentsWithAuthor] =
        useState(false);

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
            const newState = toSortComments([
                ...commentsWithAuthor,
                ...combined,
            ]);

            setCommentsWithAuthor(newState);
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
                setPage((prev) => prev + 1);
            }
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

    if (isErrorCommentsWithAuthor) {
        return <ErrorComponent />;
    }

    return (
        <>
            {commentsWithAuthor.length > 0 && (
                <Wrapper>
                    <Title
                        comments={commentsData?.data || []}
                        totalLikes={totalLikes || 0}
                    />
                    {commentsWithAuthor.map((comment) => {
                        return (
                            <StyledWrapperComments key={comment.id}>
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                    toLikeCommentToggle={toLikeCommentToggle}
                                />
                            </StyledWrapperComments>
                        );
                    })}

                    {isLoadingCommentsWithAuthor ? (
                        <Loader />
                    ) : (
                        <LoadMoreButton
                            onClick={handlerLoadMore}
                            disabled={disabledLoadMore}
                        />
                    )}
                </Wrapper>
            )}
        </>
    );
};

export default AllComments;

const Wrapper = styled.div`
    width: 35.063rem;
    height: 100vh;
    max-height: 100%;
    margin-top: 5rem;
    position: relative;
    padding-bottom: 30px;

    @media (max-width: 768px) {
        width: 25.5rem;
    }

    @media (max-width: 480px) {
        width: 17rem;
    }
`;

const StyledWrapperComments = styled.div`
    max-width: 100%;
`;
