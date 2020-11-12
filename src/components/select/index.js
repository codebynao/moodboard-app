import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Components
import CreatableSelect from 'react-select/creatable'

const Select = ({ options, defaultOption, update }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState(defaultOption)

  const handleChange = option => {
    update(option[0].value)
    setSelectedOptions([...selectedOptions, option[0]])
  }

  const handleCreate = inputValue => {
    setIsLoading(true)
    setTimeout(() => {
      update(inputValue)
      setSelectedOptions([
        ...selectedOptions,
        { value: inputValue, label: inputValue }
      ])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <CreatableSelect
      isMulti={true}
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={selectedOptions}
      menuPlacement='auto'
    />
  )
}

Select.defaultProps = {
  defaultOption: []
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  defaultOption: PropTypes.array,
  update: PropTypes.func.isRequired
}

export default Select
