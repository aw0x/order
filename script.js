document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault()

    const formData = {
        id: document.getElementById('order_no').value
    }

    try {
        const response = await fetch('http://localhost:3000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const responseData = await response.json()
        displayData(responseData)
        document.getElementById('dataForm').classList.add('hidden')
        document.getElementById('actionButtons').classList.remove('hidden')
    } catch (error) {
        console.error('Error:', error)
        alert('Terjadi kesalahan saat mengirim data.')
    }
})

function displayData(data) {
    const resultContainer = document.getElementById('resultContainer')
    resultContainer.innerHTML = '' // Clear previous results

    const successMessage = document.createElement('h2')
    successMessage.className = 'text-2xl font-bold mb-6 text-center'
    successMessage.innerText = 'Data Berhasil Dikirim!'
    resultContainer.appendChild(successMessage)

    const orderDetails = data.data[0]

    const orderNumber = document.createElement('p')
    orderNumber.className = 'text-sm text-center pb-4'
    orderNumber.innerText = `${orderDetails.main_order_id}`
    resultContainer.appendChild(orderNumber)

    orderDetails.sku_module.forEach((product) => {
        const productContainer = document.createElement('div')
        productContainer.className = 'mb-4 p-4 border border-gray-300 rounded-md'

        const productName = document.createElement('p')
        productName.className = 'text-sm'
        productName.innerText = `Product Name : ${product.product_name}`
        productContainer.appendChild(productName)

        const skuName = document.createElement('p')
        skuName.className = 'text-sm'
        skuName.innerText = `SKU : ${product.sku_name}`
        productContainer.appendChild(skuName)

        const quantity = document.createElement('p')
        quantity.className = 'text-sm'
        quantity.innerText = `Quantity : ${product.quantity}`
        productContainer.appendChild(quantity)

        const price = document.createElement('p')
        price.className = 'text-sm'
        price.innerText = `Price : ${product.sku_total_price.format_price}`
        productContainer.appendChild(price)

        resultContainer.appendChild(productContainer)
    })

    const totalPrice = document.createElement('p')
    totalPrice.className = 'text-sm font-semibold'
    totalPrice.innerText = `Grand Total : ${orderDetails.price_module.grand_total.format_price}`
    resultContainer.appendChild(totalPrice)
}

document.getElementById('inputAgain').addEventListener('click', function() {
    document.getElementById('dataForm').classList.remove('hidden')
    document.getElementById('actionButtons').classList.add('hidden')
    document.getElementById('resultContainer').innerHTML = ''
    document.getElementById('dataForm').reset()
})

document.getElementById('finish').addEventListener('click', function() {
    alert('Terima kasih!');
    document.getElementById('dataForm').classList.remove('hidden');
    document.getElementById('actionButtons').classList.add('hidden');
    document.getElementById('resultContainer').innerHTML = '';
    document.getElementById('dataForm').reset();
});