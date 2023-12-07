<template>
  <div class="wrapper">
    <div class="wrapperButton">
      <div id="searchGuid">
        <input
          type="text"
          id="searchInput"
          v-model="inputGuid"
          @keyup.enter="createWidget"
        />
        <button type="button" @click="createWidget">Получить Виджет</button>
      </div>
      <div id="createIco">
        <button v-for="item in selectMaterials"
        :key="item.id"
        @click="selectWidget(item)"
        >
          <img :src="item.image_min" alt="ico" />
        </button>
      </div>
    </div>
    <div id="widget"></div>
  </div>
</template>

<script>
import ConstructorModal from '@/class/constructor';
import ViewModal from '@/class/viewmodal';
import ApiRequests from '@/class/ApiRequests';  

export default {
  data() {
    return {
      selectedCollactions: '',
      selectedProduct: '',
      selectedWidget: '',
      selectedUuid: '',
      selectMaterials: '',
      sizeMaterials: '',
      codeMaterials: '',
      inputGuid: '',
      apiRequests: new ApiRequests(),  
      viewModal: new ViewModal(),
    };
  },
  methods: {
    async createWidget() {
      this.viewModal.clearWidget('iframe', 'widget');

      try {
        let response = await this.apiRequests.getCollaction();
        this.selectedCollactions = this.constructorModal.setSelectedCollactions(response);

        response = await this.apiRequests.getProduct(this.inputGuid, this.selectedCollactions);
        this.selectedProduct = this.constructorModal.setSelectedProduct(response);
        this.selectedUuid = this.constructorModal.setSelectedUuid(response);

        response = await this.apiRequests.getMaterial(this.selectedProduct);
        this.sizeMaterials = this.constructorModal.setSizeMaterials(response);

        response = await this.apiRequests.getWidget(this.selectedProduct);
        this.selectedWidget = this.constructorModal.setSelectedWidget(response);
        this.selectMaterials = this.viewModal.filterMaterials(
          this.constructorModal.setSelectMaterials(response)
        );

        let iframeElement = document.createElement('iframe');
        iframeElement.src = `${this.apiRequests.linkWidget.defaults.baseURL}/${this.selectedUuid}/${this.selectedWidget}/`;  // Access linkWidget through ApiRequests
        iframeElement.allowFullscreen = true;
        iframeElement.allow = 'camera; autoplay; xr-spatial-tracking';

        let containerElement = document.getElementById('widget');
        containerElement.appendChild(iframeElement);
      } catch (error) {
        console.error('Error in createWidget:', error.message || error);
      }
    },
    selectWidget(item) {
      this.codeMaterials = item.codename;
      let iframeElement = document.querySelector('iframe');
      iframeElement.src = `${this.apiRequests.linkWidget.defaults.baseURL}/${this.selectedUuid}/${this.selectedWidget}/?materialCode=${this.codeMaterials}`;  // Access linkWidget through ApiRequests
    },
  },
  created() {
    this.constructorModal = new ConstructorModal();
    this.viewModal = new ViewModal();
  },
};
    // this.selectedCollactions = response.data.map((item) => item.key);
    // this.selectedProduct = response.data.results.map((item) => item.id);
    // this.selectedUuid = response.data.results.map((item) => item.uuid);
    // this.apiRequests.setSelectedUuid(response)
    //  this.sizeMaterials = response.data.results.map((item) => item);
    // this.selectedWidget = response.data.results.map((item) => item.id);
    // this.selectMaterials = response.data.results[0].product.materials.map((item) => item);

</script>

<style>
#widget{
  width: 80%;
  height: 100%;
}
#widget iframe{
  width: 80%;
  height: 100%;
  border: none;
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
