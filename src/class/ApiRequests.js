// ApiRequests.js
import { linkWidget } from '@/main.js';
export default class ApiRequests {
  constructor() {
    this.linkWidget = linkWidget;
  }

  async getCollaction() {
    return await this.linkWidget.get(`${this.linkWidget.defaults.baseURL}/api/v1/collections/`);
  }

  async getProduct(inputGuid, selectedCollactions) {
    return await this.linkWidget.get(`${this.linkWidget.defaults.baseURL}/api/v1/products/?search=${inputGuid}&collections=${selectedCollactions}`);
  }

  async getMaterial(selectedProduct) {
    return await this.linkWidget.get(`${this.linkWidget.defaults.baseURL}/api/v1/materials/?product=${selectedProduct}`);
  }

  async getWidget(selectedProduct) {
    return await this.linkWidget.get(`${this.linkWidget.defaults.baseURL}/api/v1/widgets/?product=${selectedProduct}`);
  }
}
