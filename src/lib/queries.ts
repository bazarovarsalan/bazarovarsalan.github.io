import {useQuery} from "@tanstack/react-query";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {IAuthor, IPaginationComments} from "src/types/types";

export function useFetchAuthors() {
    return useQuery<IAuthor[]>({
        queryKey: ["authors"],
        queryFn: getAuthorsRequest,
    });
}

export function useFetchComments(page: number) {
    return useQuery<IPaginationComments>({
        queryKey: ["comments", page],
        queryFn: () => getCommentsRequest(page),
    });
}
