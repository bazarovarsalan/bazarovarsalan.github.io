import styled from "styled-components";

export const Loader = () => {
    return (
        <Wrapper>
            <StyledLoader />
        </Wrapper>
    );
};

export default Loader;

const StyledLoader = styled.div`
    border: 8px solid #8297ab;
    border-top: 8px solid #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
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
