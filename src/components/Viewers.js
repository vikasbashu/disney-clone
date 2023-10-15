import styled from "styled-components";

export const Viewers = (props) => {
    return (
        <Container>
            <Wrap>
                <a href="">
                    <img src="/images/png/viewers-marvel.png" alt="marvel"/>
                    <video autoPlay={true} loop={true} playsInline={true}>
                        <source src="/videos/mp4/marvel.mp4" type="video/mp4"/>
                    </video>

                </a>
              </Wrap>
              <Wrap>
                <a href="">
                    <img src="/images/png/viewers-national.png" alt="NatGeo"/>
                </a>
              </Wrap>
              <Wrap>
                <a href="">
                    <img src="/images/png/viewers-starwars.png" alt="starwars"/>
                </a>
              </Wrap>
              <Wrap>
                <a href="">
                    <img src="/images/png/viewers-pixar.png" alt="pixer"/>
                </a>
              </Wrap>
              <Wrap>
                <a href="">
                    <img src="/images/png/viewers-disney.png" alt="disney"/>
                </a>
              </Wrap>
        </Container>
    );
}

const Container = styled.div`
    margin-top: 30px;
    display: grid;
    padding: 30px 0px 26px; 
    grid-gap: 25px;
    gap: 25px;
    grid-template-columns: repeat(5, minmax(0, 1fr));

    @media (max-width: 768px){
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;

const Wrap = styled.div`
    padding-top: 56.25%;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    border: 3px solid rgba(249, 249, 249, 0.1);
    tranistion: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    img {
        inset : 0px;
        display: block;
        height: 100%;
        object-fit: covre;
        opacity: 1;
        position: absolute;
        transition: opacity 500ms ease-in-out 0s;
        width: 100%initial;
    }
`;