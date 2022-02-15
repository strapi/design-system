export const getOptionStyle = ({ theme }) => `
    text-align: left;
    width: 100%;
    color: ${theme.colors.neutral800};
    border-radius: ${theme.borderRadius};
    &:focus {
        background-color: ${theme.colors.primary100};
    }
    &:not([aria-disabled]):hover {
        background-color: ${theme.colors.primary100};
    }
`;
