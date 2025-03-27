import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { marked } from "marked";
import { Eye, Edit2, Save, Lightbulb, Loader2 } from "lucide-react";
import auth from "../app write services/auth.service";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Import a theme (choose any)

function EditorContainer({
  title,
  setTitle,
  content,
  setContent,
  id,
  updateData,
  mode = "markdown",
  children,
  className,
  ...props
}) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const editorRef = useRef(null);
  const cursorPositionRef = useRef(null);
  const autoSaveTimerRef = useRef();
  const [isLoding, setiIsLoading] = useState(false);

  // Memoized markdown renderer
  const renderMarkdown = useCallback(() => {
    marked.setOptions({
      gfm: true,
      breaks: true,
      highlight: function (code, lang) {
        const validLang = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language: validLang }).value;
      },
    });
    return { __html: marked(content) };
  }, [content]);

  // Auto-save logic
  useEffect(() => {
    if ((id === "title" && !title) || (id === "content" && !content)) {
      return;
    }

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(async () => {
      try {
        setIsSaving(true);
        setSaveError(null);
        await updateData(title, content);
      } catch (error) {
        setSaveError("Failed to save changes. Please try again.");
        console.error("Auto-save error:", error);
      } finally {
        setIsSaving(false);
      }
    }, 2000);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [title, content, id, updateData]);

  // Restore cursor position after DOM updates only in edit mode
  useLayoutEffect(() => {
    if (!editorRef.current || isPreviewMode) return;

    const selection = window.getSelection();
    if (cursorPositionRef.current && selection) {
      try {
        const range = document.createRange();
        range.setStart(
          cursorPositionRef.current.node,
          cursorPositionRef.current.offset
        );
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (error) {
        console.error("Error restoring cursor position:", error);
      }
    }
  }, [title, content, isPreviewMode]);

  const handleInput = (e) => {
    // Update cursor position before processing changes
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      cursorPositionRef.current = {
        node: range.startContainer,
        offset: range.startOffset,
      };
    }

    const newValue = e.currentTarget.innerText;
    if (id === "title") {
      setTitle(newValue);
    } else {
      setContent(newValue);
    }
  };

  const renderEditor = () => {
    if (mode === "markdown" && isPreviewMode) {
      return (
        <div className="prose h-full hide-scrollbar prose-sm prose-slate dark:prose-invert max-w-none p-4 bg-gray-800 rounded-lg overflow-auto">
          <div dangerouslySetInnerHTML={renderMarkdown()} />
        </div>
      );
    }

    return (
      <div
        ref={editorRef}
        contentEditable={true}
        onInput={handleInput}
        suppressContentEditableWarning={true}
        className={`min-h-[200px] ${
          id === "content" && "h-full"
        } p-4 bg-gray-800 rounded-lg font-mono overflow-scroll hide-scrollbar text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          id === "title" ? "text-xl font-bold" : ""
        } ${className || ""}`}
        style={{ whiteSpace: "pre-wrap" }}
        {...props}
      >
        {id === "title" ? title : content}
      </div>
    );
  };

  const enhanceNote = async () => {
    if (isPreviewMode) return;
    const prevContent = content;
    setiIsLoading(true);
    try {
      const response = await auth.generateEnhancedNote(content);
      console.log(response);
      if (response) {
        setContent(response.substring(11, response.length - 3));
      }
    } catch (error) {
      console.log(error);
      setContent(prevContent);
    } finally {
      setiIsLoading(false);
    }
  };

  return (
    <div className={`relative ${id === "content" && "h-full"}`}>
      {mode === "markdown" && id === "content" && (
        <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
          {isSaving && (
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Save className="w-4 h-4 animate-spin" />
              Saving...
            </span>
          )}
          <button
            onClick={() => setIsPreviewMode((prev) => !prev)}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            title={
              isPreviewMode ? "Switch to Edit Mode" : "Switch to Preview Mode"
            }
          >
            {isPreviewMode ? (
              <>
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </>
            )}
          </button>
          <button
            onClick={enhanceNote}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            title="Enhance Note"
          >
            {isLoding ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Lightbulb className="w-4 h-4" />
                <span>enhance</span>
              </>
            )}
          </button>
        </div>
      )}

      {saveError && (
        <div className="mb-2 p-2 bg-red-500/10 text-red-500 rounded-lg text-sm">
          {saveError}
        </div>
      )}

      {renderEditor()}
      {children}
    </div>
  );
}

export default EditorContainer;
