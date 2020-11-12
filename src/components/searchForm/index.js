import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import Button from '../../components/button'
import Input from '../../components/input'

// Icons
import { Search } from 'react-feather'

const SearchForm = ({ query, setQuery, btnMethod }) => {
  return (
    <StyledForm onSubmit={btnMethod}>
      <Input
        type='text'
        value={query}
        setValue={setQuery}
        inputId='search'
        placeholder='Search for photos...'
      />
      <Button buttonType='submit'>
        <Search />
      </Button>
    </StyledForm>
  )
}

SearchForm.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  btnMethod: PropTypes.func.isRequired
}

const StyledForm = styled.form`
  background-color: white;
  display: flex;
  justify-items: stretch;
  input {
    flex-grow: 1;
    margin: 0;
  }
  input,
  button {
    padding: 10px 25px;
  }
`

export default SearchForm
