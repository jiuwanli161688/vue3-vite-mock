import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import userMock from '../mock/user';
console.log("userMock==", userMock)
export function setupProdMockServer() {
  createProdMockServer([...userMock]);
}