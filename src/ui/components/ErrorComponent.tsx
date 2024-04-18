import styled from "styled-components";

const ErrorComponent = () => {
    return (
        <Wrapper>
            <ErrorMessage>Something went wrong</ErrorMessage>
        </Wrapper>
    );
};

export default ErrorComponent;

const Wrapper = styled.div`
    width: 35.063rem;
    height: 20rem;
    margin-top: 5rem;
    position: relative;
    padding-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        width: 25.5rem;
    }

    @media (max-width: 480px) {
        width: 17rem;
    }
`;

const ErrorMessage = styled.span`
    max-width: 15rem;
    max-height: 30px;
    color: red;
    font-size: 25px;
`;
