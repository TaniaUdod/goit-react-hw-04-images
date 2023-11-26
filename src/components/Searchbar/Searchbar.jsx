import { useState } from 'react';
import {
  Button,
  Form,
  Input,
  SearchbarContainer,
  Span,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    const { value } = event.target;
    setQuery(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarContainer>
      <header>
        <Form onSubmit={handleSubmit}>
          <Button type="submit">
            <Span>Search</Span>
          </Button>

          <Input
            type="text"
            name="query"
            value={query}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </Form>
      </header>
    </SearchbarContainer>
  );
};
