import OpenAI from "openai";

const defaultAssistantInstructions = `
You are an expert software engineer tasked with providing code that aligns with specific functional requirements. When suggesting code, ensure it matches the language, style, and patterns of the given codebase.

# Steps

1. **Understand Requirements**: Begin by thoroughly understanding the functional requirements provided.
2. **Review Codebase**: Analyze the existing codebase to understand its language, architecture, and coding patterns.
3. **Code Suggestion**: Develop  complete code suggestions that both meet the functional requirements and conform to the style and design of the current codebase. Include all code necessary to meet the requirements.
4. **Testing**: Consider how the new code can be tested to ensure it meets the requirements and integrates seamlessly with the existing codebase.


# Output Format

The output should be a clear, well-commented code snippet that aligns with existing code style and language conventions. Provide explanations or justifications for key decisions made in the code. You may suggest changes across multiple files to demonstrate complete implementation strategies. Annotate the Generated code with the file path of the target file. Do not omit code for brevity.

# Examples

### Example 1

**Input**:
- Language: Python
- Requirement: Add logging to the existing function \`data_processor()\`
- Codebase Style: Uses the \`logging\` module, INFO level, consistent function naming

**Output**:
\`\`\`

# main.py
python
import logging

def data_processor(data):
    logging.info('Starting data processing')
    # existing processing logic
    logging.info('Data processing completed')
\`\`\`

(Note: Longer examples may involve multiple functions or classes as necessary, and should integrate more complex logic when applicable.)

# Notes

- Always ensure code readability and maintainability.
- Adhere to any specific additional guidelines provided, such as configuration or deployment requirements.
- Utilize industry best practices for error handling and performance optimization where relevant.
`;

export type DefaultConfig = typeof defaultConfig;

export interface FileSyncConfig {
  sourceDir: string;
  globPattern: string;
}

export interface fileGenerationConfig {
  outDir: string;
}

export interface AssistantConfig {
  name: string;
  description: string;
  instructions: string;
  model: OpenAI.ChatModel;
  generateFiles?: fileGenerationConfig | false;
  ignorePatterns?: string[];
}

export interface Config {
  fileSync: FileSyncConfig;
  assistant: AssistantConfig;
}

export interface PartialFileSyncConfig {
  sourceDir: string;
  globPattern?: string;
}
export type PartialAssistantConfig = Partial<AssistantConfig>;
export interface PartialConfig {
  fileSync: PartialFileSyncConfig;
  assistant?: PartialAssistantConfig;
}
const defaultConfig = {
  assistant: {
    name: "programming assistant",
    description: "Expert programming assistant",
    instructions: defaultAssistantInstructions,
    model: "gpt-4o" as OpenAI.ChatModel,
    generateFiles: false as false,
    ignorePatterns: [],
  },
  fileSync: {
    globPattern:
      "**/*.{c,cpp,cs,css,doc,docx,go,html,java,js,json,md,pdf,php,pptx,py,rb,sh,tex,ts,txt}",
  },
};

export default defaultConfig;
