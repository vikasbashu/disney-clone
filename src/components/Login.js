import styled from "styled-components";
import "./Login.css";

const Login = (props) => {
    return <Container>
        <Content>
            <CTA>
                <CTALogoOne src="/images/svg/cta-logo-one.svg" alt=""/>
            </CTA>
            <BgImage/>
        </Content>
    </Container>;
};

const Container = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100vh
`;

const Content = styled.div`
    margin-bottom: 10vw;
    width: 100%;
    position: relative;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 80px 40px;
    height: 100%
`;

const BgImage = styled.div`
    background-image: url("/images/jpg/login-background.jpg");
    height: 100%;
    background-position: top;
    background-size: cover;
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
`;

const CTA = styled.div`
    margin-bottom: 2vw;
    max-width: 650px;
    flex-wrap: wrap;
    dispaly: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    align-items: center;
`;
const CTALogoOne = styled.img`
    margin-bottom: 12px;
    max-width: 600px;
    min-height: 1px;
    display: block;
    width: 100%;
`;

export default Login;