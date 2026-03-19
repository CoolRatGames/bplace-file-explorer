import styled from "styled-components";
import type {TemplateFile} from "./Types.ts";

export const ImageDataCopyButton = styled.button`
    color: ${({ theme }) => theme.colors.text1};
    border: 4px solid ${({ theme }) => theme.colors.border1};
    padding: 8px;
    background-color: rgba(50, 50, 50, 0.25);

    border-radius: 999px;
    cursor: pointer;

    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.2);

    transition: background 0.3s ease, box-shadow 0.2s ease;

    &:hover {
        box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.4);
        transform: translateY(-1px) scale(0.97);
    }

    &:active {
        transition: transform 0.1s, box-shadow 0.1s !important;
        transform: scale(0.97) translateY(1px) !important;
    }
`;

export const Table = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 12px;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text1};
    border: 2px solid ${({ theme }) => theme.colors.text1};


    background: rgba(50, 50, 50, 0.25);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    margin: 16px;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
    transition: background 0.2s ease;
    
    &:nth-child(even) {
        background: rgba(100, 100, 100, 0.25);
    }
`;

export const Td = styled.td`
    padding: 12px 16px;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.colors.text1};
`;

type TableEntryProps = {
    tName: string;
    tValue: any;
}

export function TableEntry({ tName, tValue }: TableEntryProps) {
    return <Tr>
        <Td>{tName}</Td>
        <Td>{ typeof tValue == "boolean" ? tValue.toString() : tValue }</Td>
    </Tr>
}

type Props = {
    template: TemplateFile | null;
}

export default function TemplateDataView({ template }: Props) {
    if(template == null) return <></>
    const positionEntry = (
        <>
            <span>X: {template.template.position.x.toLocaleString()}</span>
            <br/>
            <span>Y: {template.template.position.y.toLocaleString()}</span>
        </>
    );

    const imageDataCopyFunc = () => {
        //TODO: Show little popup when its copied...
        navigator.clipboard.writeText(template.template.imageData);
    };
    const imageDataEntry = (
        <ImageDataCopyButton onClick={imageDataCopyFunc}>Copy Image Data</ImageDataCopyButton>
    )

    return (
       <Table>
           <Tbody>
               <TableEntry tName="Version" tValue={template.version} />
               <TableEntry tName="Exported At" tValue={template.version} />
               <TableEntry tName="Name" tValue={template.template.name} />
               <TableEntry tName="Opacity" tValue={template.template.opacity} />
               <TableEntry tName="Position" tValue={positionEntry} />
               <TableEntry tName="Scale" tValue={template.template.scale} />
               <TableEntry tName="Rotation" tValue={template.template.rotation} />
               <TableEntry tName="Visible" tValue={template.template.visible} />
               <TableEntry tName="Width" tValue={template.template.width} />
               <TableEntry tName="Height" tValue={template.template.height} />
               <TableEntry tName="Display Mode" tValue={template.template.displayMode} />
               <TableEntry tName="Render Above Pixels" tValue={template.template.renderAbovePixels} />
               <TableEntry tName="Exclude Special Colors" tValue={template.template.excludeSpecialColors} />
               <TableEntry tName="Canvas Type" tValue={template.template.canvasType} />
               <TableEntry tName="Image in IndexedDB" tValue={template.template.imageInIndexedDB} />
               <TableEntry tName="Image Data" tValue={imageDataEntry} />
               <TableEntry tName="Needs Image Load" tValue={template.template._needsImageLoad} />
               <TableEntry tName="Version" tValue={template.template._version} />
           </Tbody>
       </Table>
    );
}