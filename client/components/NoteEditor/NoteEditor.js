import React, { useCallback, useEffect, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import {
    Editable,
    withReact,
    useSlate,
    Slate,
    ReactEditor,
    useSlateStatic,
} from "slate-react";
import {
    Editor,
    Transforms,
    createEditor,
    Point,
    Range,
    Element as SlateElement,
} from "slate";
import { css, cx } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import {
    getNoteData,
    getNotes,
    updateNoteData,
    updateNoteText,
} from "../../services/NoteService";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { setUserNotes, updateUserNote } from "../../redux/actions/UserActions";

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+s": "strike",
    "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

function NoteEditor() {
    const { noteData } = useSelector((state) => state.noteState);
    const { userNotes } = useSelector((store) => store.userState);
    const router = useRouter();
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withChecklists(withReact(createEditor())), []);
    const [noteName, setNoteName] = useState("");
    const [save, setSave] = useState(false);
    const [value, setValue] = useState(noteData.data);
    const dispatch = useDispatch();

    useEffect(() => {
        getNoteData(router.query.id).then((res) => {
            if (res) {
                setNoteName(res.name);
                setValue(res.data);
            }
        });
    }, [router.query.id]);

    useEffect(() => {
        setSave(true);
        const delayDebounceFn = setTimeout(() => {
            updateNoteText(router.query.id, value).then((res) => {
                if (res.status === 200) {
                    setSave(false);
                    dispatch(updateUserNote(router.query.id, { data: value }));
                }
            });
        }, 700);

        return () => clearTimeout(delayDebounceFn);
    }, [value]);

    const onNoteNameChange = (e) => {
        setNoteName(e.target.value);
        dispatch(updateUserNote(router.query.id, { name: e.target.value }));
        updateNoteData(router.query.id, {
            name: e.target.value,
        });
    };

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(newValue) => {
                if (newValue !== value) {
                    dispatch(
                        updateUserNote(router.query.id, {
                            updatedAt: new Date().toUTCString(),
                        })
                    );
                }
                setValue(newValue);
            }}
        >
            <div className="d-flex flex-column w-100 align-items-center justify-content-center">
                <div className="editor-header d-flex mb-3 justify-content-center">
                    <div className="col-10 d-flex gap-3">
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
                        <div className="note-editor-separator" />
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
                            format="checkbox"
                            icon="fas fa-check-square"
                        />
                        <div className="note-editor-separator" />
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
                        <div className="note-editor-separator" />
                        <MarkButton format="sub" icon="fas fa-subscript" />
                        <MarkButton format="sup" icon="fas fa-superscript" />
                    </div>
                </div>
                <div className="note-editor col-10 d-flex flex-column">
                    <input
                        value={noteName}
                        onChange={onNoteNameChange}
                        className="note-text"
                        type="text"
                        placeholder="Note name"
                    />
                    {save ? "Text is Saving" : "Saved"}
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Note text"
                        autoFocus
                        spellCheck="false"
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

const withChecklists = (editor) => {
    const { deleteBackward } = editor;

    editor.deleteBackward = (...args) => {
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
            const [match] = Editor.nodes(editor, {
                match: (n) =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n.type === "check-list-item",
            });

            if (match) {
                const [, path] = match;
                const start = Editor.start(editor, path);

                if (Point.equals(selection.anchor, start)) {
                    const newProperties = {
                        type: "paragraph",
                    };
                    Transforms.setNodes(editor, newProperties, {
                        match: (n) =>
                            !Editor.isEditor(n) &&
                            SlateElement.isElement(n) &&
                            n.type === "check-list-item",
                    });
                    return;
                }
            }
        }

        deleteBackward(...args);
    };

    return editor;
};

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
    const editor = useSlateStatic();

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
        case "checkbox":
            return (
                <p
                    className={css(
                        `text-decoration: ${
                            element.checked ? "line-through" : "none"
                        }`
                    )}
                >
                    <input
                        onChange={(event) => {
                            const path = ReactEditor.findPath(editor, element);
                            const newProperties = {
                                checked: event.target.checked,
                            };
                            Transforms.setNodes(editor, newProperties, {
                                at: path,
                            });
                        }}
                        {...attributes}
                        type="checkbox"
                    />
                    {children}
                </p>
            );
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

export default NoteEditor;
