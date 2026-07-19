/*
==========================================================
LexAI - Chat JavaScript
Author : Karthikeyan S
Version : 3.0
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ======================================================
       DOM Elements
    ====================================================== */

    const chatForm =
        document.getElementById("chat-form");

    const userInput =
        document.getElementById("user-input");

    const chatBox =
        document.getElementById("chat-box");

    const clearBtn =
        document.getElementById("clear-chat");

    const downloadBtn =
        document.getElementById("download-chat");

    const downloadPdfBtn =
        document.getElementById("download-pdf");

    const charCounter =
        document.getElementById("char-counter");

    const suggestionButtons =
        document.querySelectorAll(".suggestion-btn");

    const sendBtn =
        chatForm?.querySelector(
            'button[type="submit"]'
        );

    if (
        !chatForm ||
        !chatBox ||
        !userInput
    ) {
        return;
    }

    /* ======================================================
       Chat State
    ====================================================== */

    let chatHistory = [];

    /* ======================================================
       Utility Functions
    ====================================================== */

    function getCurrentTime() {

        return new Date().toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });

    }

    function scrollToBottom() {

        chatBox.scrollTo({

            top: chatBox.scrollHeight,

            behavior: "smooth"

        });

    }

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }

    /* ======================================================
       Character Counter
    ====================================================== */

    if (charCounter) {

        charCounter.textContent = "0 / 1500";

        userInput.addEventListener("input", () => {

            const length =
                userInput.value.length;

            charCounter.textContent =
                `${length} / 1500`;

            if (length > 1300) {

                charCounter.classList.add(
                    "text-danger"
                );

            } else {

                charCounter.classList.remove(
                    "text-danger"
                );

            }

        });

    }

    /* ======================================================
       Suggested Questions
    ====================================================== */

    if (suggestionButtons.length) {

        suggestionButtons.forEach(button => {

            button.addEventListener(

                "click",

                () => {

                    userInput.value =
                        button.textContent.trim();

                    userInput.focus();

                    if (charCounter) {

                        charCounter.textContent =
                            `${userInput.value.length} / 1500`;

                    }

                    // Uncomment if you want
                    // one-click auto send.

                    // chatForm.requestSubmit();

                }

            );

        });

    }

    /* ======================================================
       Source Cards
    ====================================================== */

    function buildSources(
        sources = []
    ) {

        if (!sources.length) {

            return "";

        }

        let html = `

            <div class="mt-3">

                <strong>

                    Sources

                </strong>

            </div>

        `;

        sources.forEach(source => {

            const filename =

                source.source
                    ?.split(/[\\/]/)
                    .pop()

                || "Unknown";

            html += `

                <div class="source-card mt-2">

                    <i class="bi bi-file-earmark-text me-2"></i>

                    <strong>

                        ${filename}

                    </strong>

                    <span class="text-muted ms-2">

                        Page ${source.page}

                    </span>

                </div>

            `;

        });

        return html;

    }

        /* ======================================================
       Create Message
    ====================================================== */

    function createMessage(
        text,
        sender,
        sources = []
    ) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            `message ${sender}`;

        const bubble =
            document.createElement("div");

        bubble.className =
            "message-bubble";

        const content =
            document.createElement("div");

        content.className =
            "message-content";

        if (sender === "bot") {

            if (window.marked) {

                content.innerHTML =
                    marked.parse(text);

            }

            else {

                content.innerHTML =
                    escapeHTML(text);

            }

            content.innerHTML +=
                buildSources(sources);

        }

        else {

            content.textContent = text;

        }

        const footer =
            document.createElement("div");

        footer.className =
            "message-footer d-flex justify-content-between align-items-center mt-2";

        const time =
            document.createElement("small");

        time.className =
            "message-time text-muted";

        time.textContent =
            getCurrentTime();

        footer.appendChild(time);

        if (sender === "bot") {

            const copyBtn =
                document.createElement("button");

            copyBtn.className =
                "btn btn-sm btn-outline-secondary";

            copyBtn.innerHTML =

                '<i class="bi bi-clipboard"></i>';

            copyBtn.title =
                "Copy Response";

            copyBtn.addEventListener(
                "click",
                () => {

                    copyText(
                        content.innerText
                    );

                    showToast(
                        "Copied to clipboard",
                        "success",
                        1500
                    );

                }
            );

            footer.appendChild(copyBtn);

        }

        bubble.appendChild(content);

        bubble.appendChild(footer);

        wrapper.appendChild(bubble);

        chatBox.appendChild(wrapper);

        chatHistory.push({

            sender,

            text,

            time: getCurrentTime()

        });

        scrollToBottom();

    }

    /* ======================================================
       Typing Indicator
    ====================================================== */

    function showTyping() {

        hideTyping();

        const typing =
            document.createElement("div");

        typing.id =
            "typing-indicator";

        typing.className =
            "message bot";

        typing.innerHTML = `

            <div class="message-bubble">

                <div class="mb-2">

                    🤖 <strong>LexAI</strong> is thinking...

                </div>

                <div class="typing-indicator">

                    <span></span>

                    <span></span>

                    <span></span>

                </div>

            </div>

        `;

        chatBox.appendChild(
            typing
        );

        scrollToBottom();

    }

    function hideTyping() {

        document

            .getElementById(
                "typing-indicator"
            )

            ?.remove();

    }

    /* ======================================================
       Loading State
    ====================================================== */

    function setChatLoading(
        loading
    ) {

        if (sendBtn) {

            setButtonLoading(

                sendBtn,

                loading,

                "Thinking..."

            );

        }

        userInput.disabled =
            loading;

        if (clearBtn) {

            clearBtn.disabled =
                loading;

        }

        if (downloadBtn) {

            downloadBtn.disabled =
                loading;

        }

        if (downloadPdfBtn) {

            downloadPdfBtn.disabled =
                loading;

        }

    }

    /* ======================================================
       Flask API Request
    ====================================================== */

    async function askLexAI(
        question
    ) {

        setChatLoading(true);

        showTyping();

        const controller =
            new AbortController();

        const timeout =
            setTimeout(() => {

                controller.abort();

            }, 180000);

        try {

            const response =
                await fetch(
                    "/api/chat",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                message:
                                    question

                            }),

                        signal:
                            controller.signal

                    }
                );

            clearTimeout(
                timeout
            );

            hideTyping();

            let data = {};

            try {

                data =
                    await response.json();

            }

            catch {

                throw new Error(
                    "Invalid server response."
                );

            }

            if (!response.ok) {

                createMessage(

                    data.error ||

                    "Unable to process your request.",

                    "bot"

                );

                showToast(

                    "Request failed.",

                    "danger"

                );

                return;

            }

            createMessage(

                data.answer ||

                "No response received.",

                "bot",

                data.sources || []

            );

            showToast(

                "Response received",

                "success",

                1500

            );

        }

        catch (error) {

            hideTyping();

            if (
                error.name ===
                "AbortError"
            ) {

                createMessage(

                    "The request timed out after 30 seconds.",

                    "bot"

                );

                showToast(

                    "Request timed out.",

                    "warning"

                );

            }

            else {

                console.error(
                    error
                );

                createMessage(

                    "Unable to connect to LexAI. Please try again.",

                    "bot"

                );

                showToast(

                    "Connection failed.",

                    "danger"

                );

            }

        }

        finally {

            clearTimeout(
                timeout
            );

            setChatLoading(
                false
            );

            userInput.focus();

        }

    }

        /* ======================================================
       Submit Handler
    ====================================================== */

    chatForm.addEventListener(

        "submit",

        async function (event) {

            event.preventDefault();

            const question =
                userInput.value.trim();

            if (!question) {

                showToast(
                    "Please enter a question.",
                    "warning"
                );

                return;

            }

            createMessage(
                question,
                "user"
            );

            userInput.value = "";

            if (charCounter) {

                charCounter.textContent =
                    "0 / 1500";

                charCounter.classList.remove(
                    "text-danger"
                );

            }

            await askLexAI(question);

        }

    );

    /* ======================================================
       Keyboard Shortcuts
    ====================================================== */

    userInput.addEventListener(

        "keydown",

        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                chatForm.requestSubmit();

            }

            if (
                event.ctrlKey &&
                event.key === "Enter"
            ) {

                event.preventDefault();

                chatForm.requestSubmit();

            }

        }

    );

    /* ======================================================
       Clear Chat
    ====================================================== */

    if (clearBtn) {

        clearBtn.addEventListener(

            "click",

            () => {

                showConfirmModal(

                    "Are you sure you want to clear the entire chat?",

                    () => {

                        chatBox.innerHTML = "";

                        chatHistory = [];

                        showToast(
                            "Chat cleared successfully.",
                            "success"
                        );

                        userInput.focus();

                    }

                );

            }

        );

    }

    /* ======================================================
       Download Chat (TXT)
    ====================================================== */

    if (downloadBtn) {

        downloadBtn.addEventListener(

            "click",

            () => {

                if (!chatHistory.length) {

                    showToast(
                        "Nothing to download.",
                        "warning"
                    );

                    return;

                }

                let text = "";

                text +=
                    "=====================================\n";

                text +=
                    "LexAI Chat History\n";

                text +=
                    "=====================================\n\n";

                chatHistory.forEach(message => {

                    text +=
                        `[${message.time}] `;

                    text +=
                        `${message.sender.toUpperCase()}\n`;

                    text +=
                        `${message.text}\n\n`;

                });

                const blob =
                    new Blob(

                        [text],

                        {

                            type:
                                "text/plain"

                        }

                    );

                const url =
                    URL.createObjectURL(blob);

                const link =
                    document.createElement("a");

                const date =
                    new Date()

                    .toISOString()

                    .slice(0, 19)

                    .replace(/:/g, "-");

                link.href = url;

                link.download =
                    `LexAI_Chat_${date}.txt`;

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(url);

                showToast(
                    "Chat downloaded.",
                    "success"
                );

            }

        );

    }

    /* ======================================================
       Download Chat (PDF)
    ====================================================== */

    window.downloadChatPDF = function () {

        if (
            typeof window.jspdf ===
            "undefined"
        ) {

            showToast(
                "jsPDF not loaded.",
                "danger"
            );

            return;

        }

        if (!chatHistory.length) {

            showToast(
                "Nothing to export.",
                "warning"
            );

            return;

        }

        const {
            jsPDF
        } = window.jspdf;

        const doc =
            new jsPDF();

        let y = 20;

        doc.setFontSize(18);

        doc.text(
            "LexAI Chat History",
            15,
            y
        );

        y += 12;

        doc.setFontSize(11);

        chatHistory.forEach(message => {

            const line =
                `[${message.time}] ${message.sender.toUpperCase()}: ${message.text}`;

            const lines =
                doc.splitTextToSize(
                    line,
                    180
                );

            doc.text(
                lines,
                15,
                y
            );

            y +=
                lines.length * 7;

            if (y > 270) {

                doc.addPage();

                y = 20;

            }

        });

        const date =
            new Date()

            .toISOString()

            .slice(0, 19)

            .replace(/:/g, "-");

        doc.save(
            `LexAI_Chat_${date}.pdf`
        );

        showToast(
            "PDF exported.",
            "success"
        );

    };

    if (downloadPdfBtn) {

        downloadPdfBtn.addEventListener(

            "click",

            downloadChatPDF

        );

    }

        /* ======================================================
       Welcome Message
    ====================================================== */

    if (chatBox.children.length === 0) {

        createMessage(

`👋 Welcome to **LexAI**.

I am your AI-powered Legal & Cyber Law Assistant.

I can answer questions from official Indian legal documents including:

• Information Technology Act, 2000
• Information Technology (Amendment) Act, 2008
• Digital Personal Data Protection Act, 2023
• CERT-In Guidelines & Advisories
• RBI Cyber Security Guidelines
• Bharatiya Nyaya Sanhita (BNS)
• Bharatiya Nagarik Suraksha Sanhita (BNSS)
• Bharatiya Sakshya Adhiniyam (BSA)

Every response is generated using Retrieval-Augmented Generation (RAG) and includes citations from the indexed documents whenever available.

Type your question below to get started.`,

            "bot"

        );

    }

    /* ======================================================
       Auto Focus
    ====================================================== */

    window.addEventListener("load", () => {

        userInput.focus();

    });

    /* ======================================================
       Initial Scroll
    ====================================================== */

    scrollToBottom();

    /* ======================================================
       Browser Offline / Online Status
    ====================================================== */

    window.addEventListener("offline", () => {

        showToast(

            "Internet connection lost.",

            "warning"

        );

    });

    window.addEventListener("online", () => {

        showToast(

            "Connection restored.",

            "success"

        );

    });

    /* ======================================================
       Prevent Accidental Multiple Submissions
    ====================================================== */

    let submitting = false;

    chatForm.addEventListener("submit", () => {

        if (submitting) {

            return;

        }

        submitting = true;

        setTimeout(() => {

            submitting = false;

        }, 1000);

    });

    /* ======================================================
       Debug Information
    ====================================================== */

    console.log(

        "%cLexAI Chat Ready",

        "color:#2563EB;font-size:14px;font-weight:bold;"

    );

    console.log({

        version: "3.0",

        model: "Llama 3",

        framework: "LangChain",

        vectorStore: "ChromaDB",

        rag: true

    });

});