import type {TemplateFile} from "./Types.ts";
import styled from "styled-components";

const Container = styled.img`
    width: 50vw;
    outline: 2px solid ${({theme}) => theme.colors.border1};
    outline-offset: 2px;
    image-rendering: pixelated;
`;

type Props = {
    template: TemplateFile | null;
}

export default function TemplateImageView({ template }: Props) {
    if(template == null) return <></>
    return <Container alt="Template Image" src={template!.template.imageData}/>;
}