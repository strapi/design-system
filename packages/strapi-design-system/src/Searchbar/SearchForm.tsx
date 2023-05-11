import * as React from 'react';

export type SearchFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'role'>;

export const SearchForm = (props: SearchFormProps): JSX.Element => <form {...props} role="search" />;
