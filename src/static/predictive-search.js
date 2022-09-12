 /*start code */
       /* Search Ajax */
       $(".dsk_search-input").bind("keyup", function (e) {
        let search_result_container = $(this).parents('.desk_search').find('.search_result_container');
        if (this.value.length < 3) {
          search_result_container.hide();
        }
        else if (this.value.length >= 3) {
          let searchKeyword = this.value; 
         
          Ajax_Predictive_Search(searchKeyword, search_result_container);
        }
      }); 
      // $(".mbl_search-input").bind("keyup", function (e) {
      //   let search_result_container = $(this).parents('.mbl_search').find('.search_result_container');
      //   if (this.value.length < 3) {
      //     search_result_container.hide();
      //   }
      //   else if (this.value.length >= 3) {
      //     let searchKeyword = this.value; 
         
      //     Ajax_Predictive_Search(searchKeyword, search_result_container);
      //   }
      // });
      
      let Ajax_Predictive_Search = (searchKeyword, search_result_container)=>{
        console.log(search_result_container); 
        fetch("/search/suggest.json?q="+searchKeyword+"&resources[type]=product,collection&resources[options][unavailable_products]=hide&resources[options][fields]=title,product_type,variants.title,body")
          .then((response) => response.json())
          .then((suggestions) => {
            console.log('suggestions ->', suggestions);
            let suggest_product = suggestions.resources.results.products.length;

          const search_items = suggestions.resources.results.products;
          const search_collections = suggestions.resources.results.collections;
              console.log(suggest_product, '')
           
          
          if (search_items.length > 0 || search_collections.length > 0) {
            let searchList ='';
            if(search_collections.length > 0){
               searchList +=`<li class="serach-item serach-item-header">
                                  <span>Collections</span>
                                </li>`;
              for(let S_collection of search_collections){
                searchList += `<li class="serach-item">
                                <a href="${S_collection.url}">
                                  <div class="serach-item-img">
                                    <img src="${S_collection.featured_image.url}" alt="">
                                  </div>
                                  <div class="serach-item-content">
                                    <p class="serach-item-title">${S_collection.title}</p>
                                  </div>
                                </a>
                              </li>`
                  if(S_collection.title == 'sample'){
                    searchList ='';
                  }            
              }                    
            }
            if(search_items.length > 0){
              searchList +=`<li class="serach-item serach-item-header">
                                <span>Products</span>
                              </li>`;
              for(let item of search_items){
              //console.log(item);
                searchList += `<li class="serach-item">
                <a href="${item.url}">
                    <div class="serach-item-img">
                      <img src="${item.image}" alt="">
                    </div>

                    <div class="serach-item-content">
                        <p class="serach-item-title">${item.title}</p>

                        <p class="serach-item-price">
                            <span class="boost-pfs-search-suggestion-product-regular-price"><span>${item.price}</span><span> AED</span></span>
                        </p>
                    </div>
                </a>
                </li>`
              }
              searchList += ` <li class="serach-item serach-result-all">
                              <a href="/search?q=${searchKeyword}&type=product&options%5Bprefix%5D=last">View all product(s)</a>
                            </li>`;
                  search_result_container.show();              
                  search_result_container.html("<div class='search_result_popuop'><ul>"+searchList+"</ul></div>");
            }
            else{
              
              searchList += `<li class="serach-item serach-item-header">
                              <span>Products</span>
                          </li>`;
                     var hide_keyword_result = 1;     
                  Alt_suggestion(searchList,search_result_container,searchKeyword,hide_keyword_result);
                  
            }
          }
        
         else{
            let searchList =`<li class="serach-item serach-item-header">
                                <span>Products</span>
                              </li>`;
                              var hide_keyword_result = 0;  
                              Alt_suggestion(searchList,search_result_container,searchKeyword,hide_keyword_result);
            
           
          }
        
        }).catch((error) => {
          console.error('Error:', error);
        }); 
      }
      let Alt_suggestion = (searchList,search_result_container,searchKeyword,hide_keyword_result)=>{

        let p = window.objectData.Suggestions_item;   
        if(p === null || p === undefined){
          let error_content = `
          <div class='search_result_popuop'><p>Sorry, nothing found for "${searchKeyword}".</p></div>
          `;
          document.querySelector(".search_result_container").style.display = "block";
          document.querySelector(".search_result_container").innerHTML = error_content;
        }else{
          var flagproduct = false; 
              for(let suggestItem of p){
                  Shopify.getProduct(suggestItem, function(product){ 
                        //console.log(JSON.stringify(product));		
                        // console.log(product);
                        flagproduct = true;
                          let price = parseFloat(product.price / 100);
                              price = price.toFixed(2);
                        searchList += `<li class="serach-item">
                              <a href="${product.url}">
                                  <div class="serach-item-img">
                                    <img src="${product.featured_image}" alt="">
                                  </div>
        
                                  <div class="serach-item-content">
                                      <p class="serach-item-title">${product.title}</p>
        
                                      <p class="serach-item-price">
                                          <span class="boost-pfs-search-suggestion-product-regular-price"><span>${price}</span><span> AED</span></span>
                                      </p>
                                  </div>
                              </a>
                            </li>` 
                    }); 
            }
        }
            
           var setIntervals =  setInterval(() => {
             if(flagproduct) {
                clearInterval(setIntervals);
                console.log("hide_keyword_result",hide_keyword_result);
                if(hide_keyword_result == 1){
                  search_result_container.html(`<div class='search_result_popuop'><ul>${searchList}</ul></div>`);
                }else{
                search_result_container.html(`<div class='search_result_popuop'><p>Sorry, nothing found for "${searchKeyword}".</p><ul>${searchList}</ul></div>`);
              }
                search_result_container.show();  
             }
            }, 100);
      }

      $(document).on("click",function() {
        $(".search_result_container").hide();
        });
    /* end Search Ajax */
  /* end code */  