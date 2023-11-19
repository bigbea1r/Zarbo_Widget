<template>
  <div class="wrapper">
    <div class="wrapperButton">
      <div id="searchGuid">
        <input type="text" id="searchInput" v-model="inputGuid" @keyup.enter="createWidget" >
        <button type="button" @click="createWidget">Получить Виджет</button>
      </div>
      <div id="createIco">
        <p>Материалы</p>
        <button v-for="item in selectedProduct" :key="item.id" @click="selectWidget(item)">
          <img :src="item.image_min"  alt="ico">
        </button>
      </div>
        
    </div>
    <div id="widget"></div>
  </div>
</template>

<script>
import axios from 'axios'
const linkWidget = axios.create({
  baseURL: 'https://embed.dev.zarbo.works',
  headers: {
    common: {
      'Authorization': 'Api-Key UURjJ3ez.7inOMuZnHNZyochLX8sapyRuuAsk5gc6'
    }
  }
});
export default {
  data() {
    return {
      sizeMaterials: [],
      products: [],
      collection:[],

      selectedCollaction: '',
      selectedProduct: [],
      selectedGuid: '',
      selectedUuid: '',
      selectedWidget: '',

      selectedMaterial:'',

      codeMaterial: '',
      inputGuid: '',
    }
  },
  

  mounted() {
  this.search();
  document.getElementById('searchInput').addEventListener('input', (event) => {
    this.inputGuid = event.target.value;
  });
},
  methods: {
  //----------------------------------Коллекция-----------------------------
  search(){},
 async createWidget() {
  let urlCollaction = `/api/v1/collections/`;
  let urlProduct = `/api/v1/products/?search=${this.inputGuid}&collections=${this.selectedCollaction}`; 
  let urlMaterial = `/api/v1/materials/?product=${this.selectedProduct}`
  let urlWidget = `/api/v1/widgets/?product=${this.selectedProduct}`

      await linkWidget.get(urlCollaction)
        .then((response) => {
          this.collection = response.data
          this.selectedCollaction = response.data.map(item => item.key);
  //------------------------------------------------------------------------
          console.log(response.data)
          console.log(this.selectedCollaction)
  //------------------------------------------------------------------------
          });
  //----------------------------------Коллекция-----------------------------
  //---------------------------Поиск продукта коллекции---------------------
    
        await linkWidget.get(urlProduct)
          .then(response => {
            this.products = response.data.results;
            this.selectedGuid = this.products.map(item => item.guid);
            this.selectedUuid = this.products.map(item => item.uuid);
            this.selectedProduct = this.products.map(item => item.id);
  //------------------------------------------------------------------------ 
            console.log(response.data)
            console.log(this.products)
            console.log(this.selectedGuid)
            console.log(this.selectedUuid);
            console.log(this.selectedProduct)
  //------------------------------------------------------------------------
          });
  //---------------------------Поиск продукта коллекции---------------------
  //---------------------------Поиск материала продукта---------------------
      await linkWidget.get(urlMaterial)
        .then(response => {
          this.selectedMaterial = response.data.results.map(item => item)  
          this.sizeMaterials = response.data.results.map(item => item)
          this.selectedWidget = response.data.results.map(item => item.product_id);
  //------------------------------------------------------------------------
            console.log(this.selectedMaterial)
            console.log(this.sizeMaterials);
            console.log(this.selectedWidget)
            console.log(response.data)
  //------------------------------------------------------------------------
        });
  //---------------------------Поиск материала продукта---------------------
  //-------------------------------Создание виджета-------------------------
  await  linkWidget.get(urlWidget)
        .then(response => {
          this.bober = response.data.results
          this.selectedWidget = response.data.results.map(item => item.id)
          this.selectedProduct = response.data.results[0].product.materials.map(item=>item) 
          console.log(response.data.results)
          console.log(this.selectedWidget)
          console.log(this.selectedProduct)
          console.log(this.selectedUuid)
          // this.selectedProduct = response.data.results.product.materials.map(item=>item)


          let iframeElement = document.createElement('iframe');
          iframeElement.src = `${linkWidget.defaults.baseURL}/${this.selectedUuid}/${this.selectedWidget}/`;
          iframeElement.allowFullscreen = true;
          iframeElement.allow = 'camera; autoplay; xr-spatial-tracking';
          const qualityKeyToFilter = 'L';

          this.selectedProduct = this.selectedProduct.filter(item => {
            return item.quality && item.quality.key === qualityKeyToFilter;
          });
          let containerElement = document.getElementById('widget');
          containerElement.appendChild(iframeElement); 
      console.log('Длина материала' );
      console.log( this.sizeMaterials);

      console.log('Названия продуктов' );
      console.log( this.products);

      console.log('Названия коллекций' );
      console.log( this.collection);

      console.log('API Коллекции' );
      console.log( this.selectedCollaction);

      console.log('API Продукты' );
      console.log( this.selectedProduct);

      console.log('API Артикул' );
      console.log( this.selectedGuid);

      console.log('API Уникаьный ID' );
      console.log(this.selectedUuid);

      console.log('API ID виджета' );
      console.log(this.selectedWidget);

      console.log('API Материалов' );
      console.log(this.selectedMaterial);

      console.log('Код Материала' );
      console.log( this.codeMaterial);

      console.log('Введнный Артикул' );
      console.log( this.inputGuid);
        });

    },
  //-------------------------------Создание виджета-------------------------
  selectWidget(item) {
    this.codeMaterial = item.codename;
    console.log(this.codeMaterial)

    let iframeElement = document.querySelector('iframe');
    iframeElement.src = `${linkWidget.defaults.baseURL}/${this.selectedUuid}/${this.selectedWidget}/?materialCode=${this.codeMaterial}`;
    },
  }
}

  // "embed"
  // "фывф"
  // "роттердам"
  // "asdasdasdas"
  // "арарарар"
// "ролр"
// "zxczxc"
// "йарпуцшганрйгшщуца" 


// "KAPOBA_copy"
// "KAPOBA"
</script>

<style>
#widget{
  width: 80%;
  height: 100%;
}
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
}
.wrapperButton{
  min-height: 40px;
  width: 20%;
  height: 98%;
  margin: 10px 10px 10px 10px;
  display: flex;
  z-index: 1;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
}
input, button {
  margin: 5px;
  border-radius: 8px;
  border: 2px solid transparent;
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
#createIco img{
  width: 42px;
  height:42px;
  border-radius: 7px;
}
#createIco button{
padding: 0px;
background-color: white;
color: black;
width:46px;
height:46px;
}
</style>