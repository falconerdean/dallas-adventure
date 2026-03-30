# AI Prompt: PRDCore-V2 Codebase Analysis and Documentation Generation

## Your Goal
You are an AI agent tasked with analyzing a software codebase and generating comprehensive documentation. Your primary objective is to create a `README.md` file that is so clear and comprehensive that it can significantly accelerate the onboarding of new developers and allow non-technical stakeholders to understand the project's purpose and logic.

## Your Key Objectives
*   **Accelerate Onboarding:** Produce documentation that allows a junior developer to understand the codebase quickly.
*   **Clarify Business Logic:** Summarize the project's functionality in a way that is accessible to business users.
*   **Document Components:** Detail the purpose, inputs, and outputs of every file and function.
*   **Preserve History:** Ensure the original `README.md` is not deleted by renaming it before creating a new one.

## Step-by-Step Instructions

1.  **Identify Target:** Begin by confirming the root directory of the codebase you are to analyze.

2.  **Initial Reconnaissance:**
    *   Scan the entire directory structure to get a complete map of all files.
    *   Read the contents of the existing `README.md` file (if any) to understand the project's self-described purpose.
    *   Read all other Markdown files (`.md`, `.mdc`) you can find to gather additional context on goals, tasks, or architecture.

3.  **Preserve the Original README:**
    *   Check if a `README.md` file exists in the root directory.
    *   If it exists, you **must** rename it to `README-[timestamp_hash].md`. Use a unique hash based on the current date and time for the `[timestamp_hash]`.
    *   If no `README.md` exists, proceed to the next step.

4.  **Analyze the Codebase (Static & Dynamic):**
    *   **Static Analysis:** Parse the source code to identify all functions, classes, and components. For each, determine its name, parameters, and extract any existing comments.
    *   **Dynamic Analysis:** Attempt to execute the code to understand its runtime behavior. A good approach is to run the project's test suite. Capture and analyze the output (stdout/stderr) to understand the application's I/O patterns.
    *   **Security Stop:** If the code requires secrets or API keys to run, you **must stop** and ask the user for guidance. Do not proceed with dummy values.

5.  **Generate Documentation Content:**
    Based on all the information you have gathered, you will now compose two main sections of content:

    *   **Part A: Business Logic Summary:**
        *   Write a clear, high-level overview of the project.
        *   Describe its primary goals, intended outcomes, and the core business logic it implements.
        *   **Audience:** Write this section for a non-technical business user. Avoid jargon.

    *   **Part B: Technical Documentation:**
        *   Create a detailed, file-by-file and function-by-function breakdown of the codebase.
        *   For each component, you must document:
            *   Its **purpose**: What does it do?
            *   Its **inputs**: What arguments or data does it take?
            *   Its **outputs**: What does it return or what are its side effects?
        *   Provide code examples where they would help clarify how to use a specific function or class.
        *   You may provide less detail for simple utility functions, but core application logic must be documented thoroughly.

6.  **Create the Final README.md:**
    *   Create a new file named `README.md` in the root of the target directory.
    *   Structure the file as follows:
        1.  Place the **Business Logic Summary** (Part A) at the very top.
        2.  Below the summary, insert the detailed **Technical Documentation** (Part B).
    *   Ensure the entire document is well-formatted with clear headings, lists, and code blocks using standard Markdown syntax.
    *   Ensure that any past bug fixes are documented, both ones that did not work as well as ones that did. You *MUST* also document why they did or did not work *ONLY* when you know why.

## Constraints (What NOT to do)
*   **Do not** attempt to fix bugs, refactor code, or suggest performance improvements. Your role is purely to document the code as-is.
*   **Do not** manage dependencies or configure the development environment.
*   **Do not** generate diagrams or visualizations unless specifically instructed to. 