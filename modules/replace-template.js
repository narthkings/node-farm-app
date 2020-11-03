// our functin that converts our static template with the original data from json
module.exports = (temp, product) => {
  let output = temp.replace(/{%product_title%}/g, product.productName)
  output = output.replace(/{%product_slug%}/g, product.slug)
  output = output.replace(/{%product_image%}/g, product.image)
  output = output.replace(/{%product_country%}/g, product.from)
  output = output.replace(/{%product_nutrient%}/g, product.nutrients)
  output = output.replace(/{%product_quantity%}/g, product.quantity)
  output = output.replace(/{%product_price%}/g, product.price)
  output = output.replace(/{%product_desc%}/g, product.description)
  output = output.replace(/{%product_id%}/g, product.id)

  if (!product.organic)
    output = output.replace(/{%not_organic%}/g, 'not-organic') // use the not-organic class to display none if the data is false
  return output
}
