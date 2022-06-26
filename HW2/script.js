const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
    return fetch(url)
        .then((res) => res.json())
}

function init() {
    Vue.component('custom-search', {
        template: `
        <input type="text" class="goods-search" v-model="searchValue" />
        `
    })

    Vue.component('good', {
        props: [
            'item'
        ],
        template: `
        < div class= "goods-item" >
                <h3>{{ item.product_name }}</h3>
                <p>{{ item.price }}</p>
            </div>
    `
    })

    const app = new Vue({
        el: '#root',
        data: {
            items: [],
            searchValue: '',
            isVisibleCart: false
        },
        mounted() {
            service(GET_GOODS_ITEMS).then((data) => {
                this.items = data;
                return data;
            })
        },
        methods: {
            getTitle() {
                return 'test'
            },

            setVisibleCart() {
                this.isVisibleCart = !this.isVisibleCart
            },
        },
        computed: {
            calculatePrice() {
                return this.items.reduce((prev, { price }) => {
                    return prev + price;
                }, 0)
            },
            filteredItems() {
                return this.items.filter(({ product_name }) => {
                    return product_name.match(new RegExp(this.searchValue, 'gui'))
                })
            }
        }
    })
}
window.onload = init