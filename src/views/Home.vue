<template>
  <div class="wrapper">
    <div class="wrapperButton">
      <div id="searchGuid">
        <input type="text" id="searchInput" v-model="inputGuid" @keyup.enter="createWidget" >
        <button type="button" @click="createWidget">Получить Виджет</button>
      </div>
      <div id="createIco">
        <p>Материалы</p>
        <button v-for="item in selectProduct" :key="item.id" @click="selectWidget(item)">
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

      selectedCollaction: [],
      selectedProduct: '',
      selectedUuid: [],
      selectedWidget: [],
      selectProduct:[],

      codeMaterial: '',
      inputGuid: '',
    }
  },
  

  methods: {
 async createWidget() {

//-----------------------------------Чистка------------------------------------
this.sizeMaterials = [];
   this.products = [];
   this.collaction = [];
   this.selectedCollaction = [];
   this.selectedProduct = [];
   this.selectedUuid = [];
   this.selectedWidget = [];
   this.selectProduct = [];
   this.codeMaterial = [];

   let existingIframe = document.querySelector('iframe');
   if(existingIframe){
     let containerElement = document.getElementById('widget');
     let iframeElement = containerElement.getElementsByTagName('iframe')[0];
     containerElement.removeChild(iframeElement);
  }
//-----------------------------------Чистка------------------------------------
//-----------------------------------Чистка------------------------------------

  document.getElementById('searchInput').addEventListener('input', (event) => {
    this.inputGuid = event.target.value;
  });
//-----------------------------------Чистка------------------------------------
//-----------------------------------Чистка------------------------------------

  let urlCollaction = `/api/v1/collections/`;
  let urlProduct = `/api/v1/products/?search=${this.inputGuid}&collections=${this.selectedCollaction}`; 
  let urlMaterial = `/api/v1/materials/?product=${this.selectedProduct}`
  let urlWidget = `/api/v1/widgets/?product=${this.selectedProduct}`
//-----------------------------------Чистка------------------------------------

  try {
//-----------------------------------Чистка------------------------------------
        let response = await linkWidget.get(urlCollaction);
        this.collection = response.data;
        this.selectedCollaction = response.data.map(item => item.key);
//-----------------------------------Чистка------------------------------------
//-----------------------------------Чистка------------------------------------

        response = await linkWidget.get(urlProduct);
        this.products = response.data.results;
        this.selectedUuid = this.products.map(item => item.uuid);
        this.selectedProduct = this.products.map(item => item.id);
//-----------------------------------Чистка------------------------------------

        urlMaterial = `${linkWidget.defaults.baseURL}/api/v1/materials/?product=${this.selectedProduct}`;
        urlWidget = `${linkWidget.defaults.baseURL}/api/v1/widgets/?product=${this.selectedProduct}`;

        response = await linkWidget.get(urlMaterial);
        this.sizeMaterials = response.data.results.map(item => item);
        this.selectedWidget = response.data.results.map(item => item.product_id);

        response = await linkWidget.get(urlWidget);
        this.selectedWidget = response.data.results.map(item => item.id);
        this.selectProduct = response.data.results[0].product.materials.map(item => item);

        let iframeElement = document.createElement('iframe');
        iframeElement.src = `${linkWidget.defaults.baseURL}/${this.selectedUuid}/${this.selectedWidget}/`;
        iframeElement.allowFullscreen = true;
        iframeElement.allow = 'camera; autoplay; xr-spatial-tracking';
        const qualityKeyToFilter = 'L';

        this.selectProduct = this.selectProduct.filter(item => {
            return item.quality && item.quality.key === qualityKeyToFilter;
        });

        let containerElement = document.getElementById('widget');
        containerElement.appendChild(iframeElement);

    } catch (error) {
        console.error("Error in createWidget:", error);
    }
},
  selectWidget(item) {
    this.codeMaterial = item.codename;
    console.log(this.codeMaterial)

    let iframeElement = document.querySelector('iframe');
    iframeElement.src = `${linkWidget.defaults.baseURL}/${this.selectedUuid}/${this.selectedWidget}/?materialCode=${this.codeMaterial}`;
    },
  }
}
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