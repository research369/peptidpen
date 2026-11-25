import { test } from 'node:test';
import assert from 'node:assert/strict';
import { publicTrpcQuery } from '../src/lib/publicTrpc.ts';

test('public product request uses verified tRPC envelope without credentials', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async (target, options) => {
    const url = new URL(target);
    assert.equal(url.pathname,'/api/trpc/article.shopArticle');
    assert.deepEqual(JSON.parse(url.searchParams.get('input')),{json:{shopProductId:'forscherpen'}});
    assert.equal(options.headers.Authorization,undefined);
    assert.equal(options.method,undefined);
    return {ok:true,json:async()=>({result:{data:{json:{price:49}}}})};
  };
  try { assert.deepEqual(await publicTrpcQuery('https://example.test','article.shopArticle',{shopProductId:'forscherpen'}),{price:49}); }
  finally {globalThis.fetch=original;}
});
test('public transport supports direct responses and rejects service errors', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async()=>({ok:true,json:async()=>({result:{data:null}})});
    assert.equal(await publicTrpcQuery('https://example.test','article.shopArticle'),null);
    globalThis.fetch = async()=>({ok:false,status:503});
    await assert.rejects(publicTrpcQuery('https://example.test','article.shopArticle'));
    globalThis.fetch = async()=>({ok:true,json:async()=>({error:{message:'unavailable'}})});
    await assert.rejects(publicTrpcQuery('https://example.test','article.shopArticle'));
  } finally {globalThis.fetch=original;}
});
