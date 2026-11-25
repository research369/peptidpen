import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cartridgeDiscountPercent } from '../src/lib/commerceRules.ts';
import { normalizePreviewCart, freeTravelTubeCount } from '../src/lib/previewCart.ts';
import { cartridgePreviewCatalog } from '../src/lib/cartridgePreviewCatalog.ts';

test('discount boundaries match approved tiers', () => {
  for (const [quantity, percent] of [[0,0],[4,0],[5,15],[9,15],[10,20],[19,20],[20,25],[39,25],[40,35],[99,35],[-1,0],[1.5,0]]) {
    assert.equal(cartridgeDiscountPercent(quantity), percent);
  }
});
test('catalog contains unique preview-only identifiers and excludes retired products', () => {
  const ids = cartridgePreviewCatalog.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every(id => id.startsWith('preview-cartridge-')));
  for (const id of ['preview-cartridge-ahk-cu','preview-cartridge-slu-pp-332','preview-cartridge-nexus-iv']) assert.ok(!ids.includes(id));
});
test('cart normalizes names, rejects unknown/invalid rows and merges duplicate rows', () => {
  const id = cartridgePreviewCatalog[0].id;
  const rows = normalizePreviewCart([{id,name:'forged',quantity:2},{id,quantity:3},{id:'unknown',quantity:2},{id,quantity:-1},{id,quantity:1.5},{id,quantity:Infinity}]);
  assert.deepEqual(rows, [{ id, name:cartridgePreviewCatalog[0].name, quantity:5 }]);
  assert.deepEqual(normalizePreviewCart(null), []);
  assert.equal(normalizePreviewCart([{id,quantity:1000}])[0].quantity,99);
});
test('gift tube quantity excludes pen and separately purchased tubes', () => {
  const id = cartridgePreviewCatalog[0].id;
  const rows = normalizePreviewCart([{id,quantity:3},{id:'preview-pen',quantity:1},{id:'preview-travel-tube',quantity:2}]);
  assert.equal(freeTravelTubeCount(rows),3);
  assert.equal(freeTravelTubeCount([]),0);
});
test('approved blends have exact component totals and ratios', () => {
  for (const [id,total] of [['nexus-iv-25mg',25],['nexus-v-12-5mg',12.5],['nexus-v-25mg',25],['mitobolic-120',120]]) {
    const product = cartridgePreviewCatalog.find(item=>item.id===`preview-cartridge-${id}`);
    assert.ok(product?.composition);
    const amounts = [...product.composition.matchAll(/(\d+(?:,\d+)?) mg/g)].map(match=>Number(match[1].replace(',','.')));
    assert.equal(amounts.reduce((a,b)=>a+b,0),total);
    if(id.startsWith('nexus')) assert.equal(amounts[0]/amounts[1],4);
  }
});
