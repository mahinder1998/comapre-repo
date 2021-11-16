export const state = {
  relatedProducts: null,
}

export const getAllProductsWithType = async (language, type) => {
  let queryString = "";
  if(type) queryString = `product_type:${type}`;

  try {
      const query = `
      query GET_PRODUCTS {
          products (first: 10, query:"${queryString}") {
              edges {
                  node {
                    availableForSale
                    title                                          
                    handle
                    productType
                    totalInventory    
                    
                    variants(first: 10) {
                      edges {
                        node {             
                          availableForSale                                                                    
                        }
                      }
                    }                      

                    images(first:1) {
                      edges {
                        node {
                          altText
                          originalSrc
                        }
                      }
                    }
                    priceRange {
                      minVariantPrice {
                        amount
                      }
                    }
                    compareAtPriceRange {
                      maxVariantPrice {
                        amount
                      }
                    }
                  }
              }
        }
      }
    `;
    
    const getProductsResult = await axios.post('https://molton-brown-uae.myshopify.com/api/2021-07/graphql.json', {query}, { headers: {
      "Content-Type" : "application/json",
      "X-Shopify-Storefront-Access-Token" : "262dbacef9d26e53dfff834b460386d6",
      "Accept-Language": language
    }});

    const getProductsResultData = getProductsResult.data;
    if(!getProductsResultData) {
        state.relatedProducts = [];
        return;
    }

    const formattedProducts = getProductsResultData?.data?.products?.edges.map(edge => {
        return {
            "productType": edge?.node?.productType,
            "productAvailableForSale": edge?.node?.availableForSale,                                     
            "title": edge?.node?.title,
            "handle": edge?.node?.handle,
            "image": edge?.node?.images?.edges[0]?.node,
            "variants": edge?.node?.variants?.edges[0]?.node,
            "productMinPrice": edge?.node?.priceRange?.minVariantPrice?.amount,
            "productMaxPrice": edge?.node?.compareAtPriceRange?.maxVariantPrice?.amount,
        };
    });

    if(!formattedProducts) {
        state.relatedProducts = [];
        return;
    }

    state.relatedProducts = formattedProducts;

  }catch(err) {
      console.log(err.message)
  }

}

