// We start by importing tw which allows us to use Tailwind classes in nested properties. It's perfectly fine to use the utility classes with the className attribute, but if you want to nest properties you have to use the twin.macro library.

// This library will use the babel plugin macros config (babel.plugin.js) to transform the Tailwind CSS utility classes used by nested selectors into readable code that Styled Components can understand.

import styled from "styled-components";
import tw from "twin.macro";

const CheckoutStyles = styled.div.attrs({
    className: "flex flex-col justify-center items-center bg-gray-100"
})`
    & {
        h1 {
            ${tw`text-yellow-400`}
        }

        button {
            ${tw`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
            &:disabled {
                background: #666;
                cursor: not-allowed;
            }
        }
    }
`;
export default CheckoutStyles;
