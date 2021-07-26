export const state = {
    relatedProducts: null,
}

export const getAllProductsWithType = async (type) => {
    try {
        const res = await axios.get('https://molton-brown-uae.myshopify.com/products.json');
        const resData = res.data;
        if(!resData) return;
    
        state.relatedProducts = resData?.products;
    }catch(err) {
        console.log(err.message)
    }

}