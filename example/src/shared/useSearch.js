import { useState } from "react";
import {matchSorter} from 'match-sorter'

export const useSearch = (items, searchOptions) => {
  const [search, setSearch] = useState('');

  return {
    search,
    setSearch,
    searchResults: matchSorter(items, search, searchOptions),
  };
};
