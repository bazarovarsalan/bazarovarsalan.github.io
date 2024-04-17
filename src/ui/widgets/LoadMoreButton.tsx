import styled from "styled-components";

interface ILoadMoreButton {
    onClick: (event: React.MouseEvent) => void;
    disabled: boolean;
}

const LoadMoreButton = ({onClick, disabled}: ILoadMoreButton) => {
    return (
        <>
            <Wrapper>
                <StyledButton onClick={onClick} disabled={disabled}>
                    Загрузить еще
                </StyledButton>
            </Wrapper>
        </>
    );
};

export default LoadMoreButton;

const StyledButton = styled.button`
    width: 234px;
    height: 36px;
    margin-bottom: 30px;
    background-color: #313439;
    font-family: "Lato, Regular";
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    opacity: 0.5;
    border: none;
    &:hover {
        background-color: #616366;
        opacity: 0.8;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    height: 84px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
