export default class ViewModal {         
    clearWidget(iframe, widget){
        this.selectedCollactions = '';
        this.selectedProduct = '';
        this.selectedWidget = '';
        this.selectedUuid = '';
        this.sizeMaterials = '';
        this.codeMaterials = ''; 
        let existingIframe = document.querySelector(iframe);
      if(existingIframe){
        document.getElementById(widget).innerHTML = '';
      }
    }
    filterMaterials(materials) {
        return materials.filter((item) => {
          return item.name.trim() !== '';
        });
    }
}