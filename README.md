## Table of Contents

-   [Getting Started](#getting-started)
-   [Changing Hugging Face GPT Model](#changing-hugging-face-gpt-model)
-   [Prompt Generation](#prompt-generation)
-   [Codebase Structure](#codebase-structure)
-   [Import Path Aliasing](#import-path-aliasing)
-   [Design](#design)
-   [Styling](#styling)
    -   [cn - Class Name Utility](#cn---classname-utility)
    -   [Font](#font)
-   [Learn More](#learn-more)
-   [Deploy on Vercel](#deploy-on-vercel)

## Getting Started

**** TODO: switch to pnpm or bun

Download dependencies

```bash
npm i
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

App entry is `app/page.tsx`.

## Changing Hugging Face GPT model

Models constants are defined in this file

`src/constants.ts`

Update `CURRENT_MODEL` to change the Hugging Face model.

## Prompt generation

Prompt generation is currently handled by `src/services/PromptGenerator/PromptGenerator.ts`.

## Codebase structure

The `src/` directory contains all application code like routing, components, styling etc.

Configuration files and other infrastructure related files and code should be placed at the root of the repo.

See the "src-directory" section of the project structure in the Next docs:

https://nextjs.org/docs/app/building-your-application/routing/colocation#src-directory

## Import Path Aliasing

Import path aliases can be defined in `tsconfig.json`

```json
    "paths": {
      "@/*": [
        "./src/*"
      ],
      "@components/*": [
        "./src/components/*"
      ],
    }
```

## Design

Designs and wire frames in figma. Link below.

https://www.figma.com/file/u5ZnNk5WQHupgxvCtIjlrx/AIJobHunter?type=design&node-id=0-1&mode=design&t=ewY2hPNirvRCVXLp-0

## Styling

### CN - ClassName utility

`utils/style/cn.ts` contains a very handy className utility.

Example usage:

```tsx
import { cn } from '../_utils/cn'

export const SectionTitle = ({ name, classNameText }: SectionTitleProps) => {
    return (
        <div className="inline-flex pl-4 pt-4">
            <p
                className={cn([
                    'text-white w-full rounded-sm px-2',
                    // 'dark:bg-gradient-to-t from-transparent to-neutral-800',
                    'border border-white border-solid',
                    'rounded-md',
                    classNameText,
                ])}
            >
                {name}
            </p>
        </div>
    )
}

interface SectionTitleProps {
    name: string
    classNameText?: string
}
```

Don't have time to re-research all the specifics of how tailwind works and why this is necessary, but there is a lot of info online.

===== chat gpt generated explanation ======

Utility Function: cn
The cn function is a utility designed to streamline the process of combining and managing Tailwind CSS class names in your projects. This utility leverages the power of two popular libraries: clsx and tailwind-merge. Here's a brief overview of the advantages of using the cn function in your development workflow:

Simplified Class Name Management
The cn function simplifies the process of constructing class names, making your code cleaner and more readable. It enables you to conditionally apply classes and merge multiple class names effortlessly.

Conflict Resolution with Tailwind Merge
When combining Tailwind CSS classes, there's a potential for conflicts, especially with utility classes that affect the same CSS properties. The twMerge function from tailwind-merge automatically resolves these conflicts by applying Tailwind's precedence rules, ensuring that the final class string contains only the most specific or last-applied utility class.

Enhanced Conditional Classes
By integrating clsx within the cn utility, you gain an elegant syntax for including classes conditionally. This makes it straightforward to toggle classes based on state or props within your components, enhancing the dynamism and responsiveness of your UI.

Performance Optimizations
The cn function optimizes performance by avoiding unnecessary re-calculations or duplications of class names. The twMerge function ensures that the final class list is efficiently compiled, while clsx handles concatenations and conditions with minimal overhead.

Usage Example
jsx
Copy code
import React from 'react';
import { cn } from './utils/cn';

const Button = ({ primary, children }) => {
return (
<button className={cn(
'px-4 py-2 border rounded',
primary ? 'bg-blue-500 text-white' : 'bg-transparent text-blue-500 border-blue-500'
)}>
{children}
</button>
);
};
In this example, the cn function dynamically applies different sets of classes based on the primary prop, showcasing how conditional logic integrates seamlessly with class name management.

Conclusion
The cn utility function offers a powerful, streamlined approach to handling Tailwind CSS classes in your React projects. By combining the capabilities of clsx for conditional class management and tailwind-merge for conflict resolution, you can write more maintainable, readable, and efficient code when working with dynamic class names and complex styling logic.

======

Advantages of the cn Utility Function
The cn function is a powerful utility designed to enhance the experience of working with Tailwind CSS classes in dynamic, component-based architectures. By leveraging tailwind-merge (twMerge) and clsx, this function addresses several challenges related to style merging and specificity in a unique and efficient manner:

Handling Specificity and Overriding Styles
Tailwind CSS utilities follow specific precedence rules, where utilities declared later can override those declared earlier if they affect the same CSS property. The cn function uses tailwind-merge to intelligently merge class names according to Tailwind's specificity rules, ensuring overrides happen as expected without manual sorting or intervention.

markdown
Copy code
Ensures the correct application of Tailwind's precedence rules without manual class ordering.
Avoiding Duplicate Classes
Dynamically concatenating class names can introduce duplicates, leading to bloated class attributes. The cn function automatically eliminates duplicate classes through clsx and tailwind-merge, resulting in cleaner and more efficient markup.

markdown
Copy code
Automatically removes duplicate utility classes, leading to cleaner markup.
Efficiently Merging Variant and Responsive Classes
Tailwind includes variant (e.g., hover:, focus:) and responsive utilities, complicating style merging. The cn function gracefully handles merging such classes, choosing the correct variant or responsive utility class based on Tailwind's rules.

markdown
Copy code
Gracefully merges variant and responsive utility classes, respecting Tailwind CSS's specificity and precedence rules.
Simplifying Dynamic Style Application
Applying styles dynamically based on component state or props is streamlined with cn. It offers a clean and expressive API for combining static and dynamic classes, enhancing code readability and maintainability.

markdown
Copy code
Provides a simple, expressive API for conditional class application, enhancing code readability and maintainability.
Example Benefit
Without cn, developers might concatenate class strings manually, ensuring correct order to respect Tailwind's specificity rules — a process that can be tedious and error-prone:

jsx
Copy code
// Manually concatenating classes and ensuring order
const buttonClass = `px-4 py-2 border rounded ${
  primary ? "bg-blue-500 text-white" : "bg-transparent text-blue-500 border-blue-500"
}`;
With cn, this process is simplified, abstracting away the complexities of merging, ordering, and de-duplicating classes:

jsx
Copy code
// Simplified with cn
const buttonClass = cn(
"px-4 py-2 border rounded",
primary ? "bg-blue-500 text-white" : "bg-transparent text-blue-500 border-blue-500"
);
Conclusion
The cn utility significantly simplifies the management of Tailwind CSS classes in dynamic environments. It abstracts the intricacies of class merging, specificity, and conditional styling, allowing developers to focus on UI construction rather than CSS class management nuances.

===== chat gpt generated explanation - END ======

### Font

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
