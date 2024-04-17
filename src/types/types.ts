export interface IAuthor {
    id: number;
    name: string;
    avatar: string;
}

export interface IComment {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: number | null;
    likes: number;
}

export interface IPaginationComments {
    pagination: {
        page: number;
        size: number;
        total_pages: number;
    };
    data: IComment[];
}

export interface ICommentWithAuthor extends IComment {
    authorInfo: IAuthor | undefined;
    children: ICommentWithAuthor[];
}
