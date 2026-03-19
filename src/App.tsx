import styled, {ThemeProvider, useTheme} from "styled-components";
import {THEME_DARK, THEME_LIGHT} from "./themes/Themes.ts";
import ThemeToggle from "./themes/ThemeToggle.tsx";
import React, {useState} from "react";
import FileChooser from "./FileChooser.tsx";
import type {TemplateFile} from "./template/Types.ts";
import TemplateImageView from "./template/TemplateImageView.tsx";
import TemplateDataView from "./template/TemplateDataView.tsx";

const RootContainer = styled.div`
    background: ${({theme}) => theme.colors.background1};
    color: ${({ theme }) => theme.colors.text1};
    
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function App() {
    const preventDragDrop: (e: React.DragEvent<HTMLDivElement>) => void = (e) => { e.preventDefault(); };
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const [template, setTemplate] = useState<TemplateFile | null>(null);

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = (prev === "light" ? "dark" : "light");
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    const onFileChoose = async (list: FileList) => {
        const file: File | null = list.item(0);
        if(!file) return;
        const fileContent = await file.text();
        setTemplate(JSON.parse(fileContent));
    }

    return (
        <ThemeProvider theme={theme == "light" ? THEME_LIGHT : THEME_DARK}>
            <RootContainer onDragOver={preventDragDrop} onDrop={preventDragDrop}>
                <ThemeToggle onClick={toggleTheme} />
                <FileChooser onFileSelected={onFileChoose}></FileChooser>
                <h1>Better Place File Explorer</h1>
                <TemplateImageView template={template}/>
                <TemplateDataView template={template}/>
            </RootContainer>
        </ThemeProvider>
    )
}