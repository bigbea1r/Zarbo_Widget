export default class ConstructorModal{
    setSizeMaterials(response) {
        return this.sizeMaterials = response.data.results.map((item) => item);
    }
    setSelectedCollactions(response) {
        return this.selectedCollactions = response.data.map((item) => item.key);
    }
    setSelectedProduct(response) {
        return this.selectedProduct = response.data.results.map((item) => item.id);
    }
    setSelectedUuid(response) {
        return this.selectedUuid = response.data.results.map((item) => item.uuid);
    }
    setSelectedWidget(response) {
        return this.selectedWidget = response.data.results.map((item) => item.id);
    }
    setSelectMaterials(response) {
        return this.selectMaterials = response.data.results[0].product.materials.map((item) => item);
    }
    setCodeMaterial(response) {
        return this.codeMaterial = response.data.results.map((item) => item);
    }
}

