const HAR = (function () {
    return {
        init: function () {
            // search box toggle js
            $("#searchbar .search-label").on("click", function (e) {
                e.preventDefault();
                $("#searchbar").toggleClass("collapsed");
            });

            // product search js
            $(".search-input").bind("keyup", function (e) {
                if (this.value.length < 3) {
                    // console.log(this.value.length);
                    //$("#productData").html('');
                    //$("#viewResults").html('');
                    $(".search-result-weap").hide();
                } else if (this.value.length >= 3) {
                    var searchKeyword = this.value;
                    //$(".search-result-weap").show();
                }

                jQuery
                    .getJSON("/search/suggest.json", {
                        q: searchKeyword,
                        resources: {
                            type: "product",
                            options: {
                                unavailable_products: "last",
                                fields: "title,product_type,variants.title",
                            },
                        },
                    })
                    .done(function (response) {
                        var productSuggestions = response.resources.results.products;
                        var pro_length = productSuggestions.length;
                        //var finalColldata = productSuggestionsColl[0];
                        var notFoundmessage = 0;
                        //console.log(finalColldata.id);
                        if (productSuggestions.length > 0) {
                            var str = "";
                            var show_counter = 1;
                            for (i = 0; i < pro_length; i++) {
                                if (show_counter <= 3) {
                                    $(".search-result-weap").show();
                                    var firstProductSuggestion = productSuggestions[i];
                                    str +=
                                        '<a href="' +
                                        firstProductSuggestion.url +
                                        '" class="search-result-items"><div class="get-product-image"><img src="' +
                                        firstProductSuggestion.image +
                                        '"></div>' +
                                        '<div class="get-product-title">' +
                                        firstProductSuggestion.title +
                                        "</div>" +
                                        '<div class="get-product-price">' +
                                        firstProductSuggestion.price +
                                        "</div></a>";
                                    //console.log("The title of the first product suggestion is: " + firstProductSuggestion.id);
                                    //console.log(firstProductSuggestion.title);
                                    show_counter = show_counter + 1;
                                }
                            }
                            $(".productData").html(str);

                            if (pro_length > 3) {
                                $(".viewResults").html("More Results");
                            }
                            $(".customSearchredirect").attr("href", "https://molton-dev.myshopify.com/search?q=" + searchKeyword + "&type=product");
                        } else {
                            notFoundmessage = notFoundmessage + 1;
                            //$("#productData").html('Sorry no result found');
                        }
                    });
            });

            // account page tab js
            $(".tabs-main li").click(function () {
                var tab_id = $(this).attr("data-tab");

                $(".tabs-main li").removeClass("current");
                $(".tabs-items").removeClass("current");
                $(this).addClass("current");
                $("." + tab_id).addClass("current");
            });

            $(".template-customers-addresses .tabs-main li.current").click(function () {
                $(".template-customers-addresses .my_address").addClass("current");
            });

            // customer order tab
            var url = window.location.href;
            var pageURL = url.split("#").pop();
            var splitvalue = pageURL.split("+");
            //alert(pageURL);
            if (pageURL == "my_order") {
                $(".tab-link").removeClass("current");
                $(".tabs-items").removeClass("current");
                $("#my_order").parent().addClass("current");
                $(".my_order").addClass("current");
            }
        }
    }
})();

export default HAR;