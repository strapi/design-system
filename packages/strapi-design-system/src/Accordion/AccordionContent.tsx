import { useAccordion } from './AccordionContext';
import { Box, BoxProps } from '../Box';

type AccordionContentProps = Omit<BoxProps, 'tag'>;

const AccordionContent = ({ children, ...props }: AccordionContentProps) => {
  const { expanded, id } = useAccordion();

  if (!expanded) {
    return null;
  }

  const idContent = `accordion-content-${id}`;
  const ariaLabelId = `accordion-label-${id}`;
  const ariaDescriptionId = `accordion-desc-${id}`;

  return (
    <Box role="region" id={idContent} aria-labelledby={ariaLabelId} aria-describedby={ariaDescriptionId} {...props}>
      {children}
    </Box>
  );
};

export { AccordionContent };
export type { AccordionContentProps };
