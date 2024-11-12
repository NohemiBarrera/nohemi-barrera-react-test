import React from 'react';
import { Search } from 'lucide-react';
import styles from '../ProductList.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className={styles.searchBar}>
    <Search className={styles.searchIcon} />
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);