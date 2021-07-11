const PDPListeners = (function (){

    function countListeners() {
        const countAdd = document.querySelector('.pdp__content__control__qty__next')
        const countRemove = document.querySelector('.pdp__content__control__qty__prev')
        const countValue = document.querySelector('.pdp__content__control__qty__value')

        console.log(countAdd)
        console.log(countRemove)
        console.log(countValue)

        countAdd.addEventListener('click', function() {
            let currentCount = parseInt(countValue.innerHTML.slice())
            currentCount = currentCount + 1;
            countValue.innerHTML = currentCount;
        })
        countRemove.addEventListener('click', function() {
            let currentCount = parseInt(countValue.innerHTML.slice())
            if(currentCount != 1) {
                currentCount = currentCount - 1;
                countValue.innerHTML = currentCount;
            }
        })
    }

    function accordionListeners() {
        const buttons = document.querySelectorAll('.pdp__content__accordion__header');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // remove is-open from all the bodies
                document.querySelectorAll('.pdp__content__accordion__body').forEach(body => {
                    body.classList.remove('is-open');
                })
                document.querySelectorAll('.pdp__content__accordion__icon').forEach(icon => {
                    icon.classList.remove('is-open');
                })


                // add is-open to selected body
                const body = this.nextElementSibling;
                body && body.classList.add('is-open');

                const cloestArrowIcon = this.querySelector('.pdp__content__accordion__icon');
                cloestArrowIcon && cloestArrowIcon.classList.add('is-open')
                
            });
        });
    }

    return {
        init: () => {
            countListeners();
            accordionListeners();
        }
    }
})();

export default PDPListeners;