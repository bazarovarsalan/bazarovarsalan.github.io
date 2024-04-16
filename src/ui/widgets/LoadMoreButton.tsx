import styled from "styled-components";

const LoadMoreButton = () => {
    return (
        <>
            <StyledButton>Загрузить еще</StyledButton>
            <Div></Div>
        </>
    );
};

export default LoadMoreButton;

const StyledButton = styled.button`
    width: 234px;
    height: 36px;
    background-color: #313439;
    font-family: "Lato, Regular";
    font-size: 16px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    cursor: pointer;
    opacity: 0.5;
    border: none;
    &:hover {
        background-color: #616366;
        opacity: 0.8;
    }
`;

const Div = styled.div`
    width: 100%;
    height: 84px;
`;
