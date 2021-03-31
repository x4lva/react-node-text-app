import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
    Editor,
    Transforms,
    createEditor,
    Element as SlateElement,
} from "slate";
import { css, cx } from "@emotion/css";

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

function NoteEditor(props) {
    const [value, setValue] = useState(initialValue);
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withReact(createEditor()), []);

    console.log(value);
    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(value) => setValue(value)}
        >
            <div className="d-flex flex-column w-100 align-items-center justify-content-center">
                <div className="editor-header d-flex mb-3 w-100 justify-content-center">
                    <div className="col-10 d-flex gap-3 ">
                        <MarkButton format="bold" icon="fas fa-bold" />
                        <MarkButton format="italic" icon="fas fa-italic" />
                        <MarkButton
                            format="underline"
                            icon="fas fa-underline"
                        />
                        <MarkButton
                            format="strike"
                            icon="fas fa-strikethrough"
                        />
                        <MarkButton format="code" icon="fas fa-code" />
                        <BlockButton
                            format="block-quote"
                            icon="fas fa-quote-right"
                        />
                        <BlockButton format="header" icon="fas fa-heading" />
                        <BlockButton
                            format="numbered-list"
                            icon="fas fa-list-ol"
                        />
                        <BlockButton
                            format="bulleted-list"
                            icon="fas fa-list-ul"
                        />
                        <BlockButton
                            format="text-left"
                            icon="fas fa-align-left"
                        />
                        <BlockButton
                            format="text-center"
                            icon="fas fa-align-center"
                        />
                        <BlockButton
                            format="text-right"
                            icon="fas fa-align-right"
                        />
                        <BlockButton
                            format="text-justify"
                            icon="fas fa-align-justify"
                        />
                        <MarkButton format="sub" icon="fas fa-subscript" />
                        <MarkButton format="sup" icon="fas fa-superscript" />
                    </div>
                </div>
                <div className="col-10">
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Enter some rich text…"
                        spellCheck
                        autoFocus
                        onKeyDown={(event) => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault();
                                    const mark = HOTKEYS[hotkey];
                                    toggleMark(editor, mark);
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </Slate>
    );
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            LIST_TYPES.includes(
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
            ),
        split: true,
    });
    const newProperties = {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === format,
    });

    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        case "text-center":
            return (
                <p className="text-center" {...attributes}>
                    {children}
                </p>
            );
        case "text-left":
            return (
                <p className="text-start" {...attributes}>
                    {children}
                </p>
            );
        case "text-right":
            return (
                <p className="text-end" {...attributes}>
                    {children}
                </p>
            );
        case "text-justify":
            return (
                <p className="text-justify" {...attributes}>
                    {children}
                </p>
            );
        case "header":
            return <h4 {...attributes}>{children}</h4>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }
    if (leaf.sub) {
        children = <sub>{children}</sub>;
    }
    if (leaf.sup) {
        children = <sup>{children}</sup>;
    }
    if (leaf.strike) {
        children = <strike>{children}</strike>;
    }
    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            className="editor-button"
            active={isBlockActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <i className={icon} />
        </Button>
    );
};

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            className="editor-button"
            active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <i className={icon} />
        </Button>
    );
};

export const Button = React.forwardRef(
    ({ className, active, reversed, ...props }, ref) => (
        <span
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
                    cursor: pointer;
                    color: ${reversed ? active : active ? "#fff" : "#8b7f7f"};
                `
            )}
        />
    )
);

const initialValue = [
    {
        type: "paragraph",
        children: [
            { text: "This is editable " },
            { text: "rich", bold: true },
            { text: " text, " },
            { text: "much", italic: true },
            { text: " better than a " },
            { text: "<textarea>", code: true },
            { text: "!" },
        ],
    },
    {
        type: "paragraph",
        children: [
            {
                text:
                    "Since it's rich text, you can do things like turn a selection of text ",
            },
            { text: "bold", bold: true },
            {
                text:
                    ", or add a semantically rendered block quote in the middle of the page, like this:",
            },
        ],
    },
    {
        type: "block-quote",
        children: [{ text: "A wise quote." }],
    },
    {
        type: "paragraph",
        children: [{ text: "Try it out for yourself!" }],
    },
];

export default NoteEditor;
