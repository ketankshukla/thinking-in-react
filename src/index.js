import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const ProductCategoryRow = ({ product }) => {
  return (
    <tr>
      <th colSpan='2'>{product.category}</th>
    </tr>
  )
}

const ProductRow = ({ product }) => {
  const coloredName = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  )
  return (
    <tr>
      <td>{coloredName}</td>
      <td align='right'>{product.price}</td>
    </tr>
  )
}

const ProductTable = ({ products, filterText, inStockOnly }) => {
  const rows = []
  let lastCategory = null
  let total = 0

  // loop through product categories, and for each category, display its rows
  // then move to the next category
  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText) === null) {
      return
    }
    if (inStockOnly && !product.stocked) {
      return
    }

    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow product={product} key={product.category} />)

    }
    rows.push(<ProductRow product={product} key={product.name} />)
    lastCategory = product.category
  })

  //loop over all ProductRow price values and use the Array Reduce method to get the total for that
  //category.

  return (
    <table width='100%'>
      <thead>
        <tr style={{ color: 'blue' }}>
          <th align='left'>Name</th>
          <th align='right'>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

const SearchBar = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) => {
  return (
    <form action=''>
      <input
        type='text'
        placeholder='Search...'
        value={filterText}
        onChange={(event) => onFilterTextChange(event.target.value)}
      />
      <p>
        <input
          type='checkbox'
          checked={inStockOnly}
          onChange={(event) => onInStockOnlyChange(event.target.checked)}
        />{' '}
        <span style={{ color: 'green', fontSize: 'smaller' }}>
          Only Show Products In Stock
        </span>
      </p>
    </form>
  )
}

const FilterableProductTable = ({ products }) => {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  const handleFilterTextChange = (filterText) => {
    setFilterText(filterText)
  }

  const handleInStockOnlyChange = (inStockOnly) => {
    setInStockOnly(inStockOnly)
  }

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockOnlyChange={handleInStockOnlyChange}
      />
      <ProductTable
        filterText={filterText}
        inStockOnly={inStockOnly}
        products={products}
      />
    </div>
  )
}

const PRODUCTS = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football'
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball'
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball'
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch'
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5'
  },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
]

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
)
