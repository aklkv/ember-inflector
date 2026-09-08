import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import pluralize from '#src/helpers/pluralize.ts';
import singularize from '#src/helpers/singularize.ts';

module('Integration | Helper | ember-inflector', function (hooks) {
  setupRenderingTest(hooks);

  test('singularize', async function (assert) {
    const plural = 'octopi';

    await render(<template>{{singularize plural}}</template>);

    assert.dom().hasText('octopus');
  });

  test('pluralize - single arg', async function (assert) {
    const singular = 'ox';

    await render(<template>{{pluralize singular}}</template>);

    assert.dom().hasText('oxen');
  });

  test('pluralize - count 1', async function (assert) {
    const singular = 'opossum';

    await render(<template>{{pluralize 1 singular}}</template>);

    assert.dom().hasText('1 opossum');
  });

  test('pluralize - count 2', async function (assert) {
    const singular = 'ocelot';

    await render(<template>{{pluralize 2 singular}}</template>);

    assert.dom().hasText('2 ocelots');
  });

  test('pluralize - bound count 1', async function (assert) {
    const count = 1;
    const singular = 'orange';

    await render(<template>{{pluralize count singular}}</template>);

    assert.dom().hasText('1 orange');
  });

  test('pluralize - bound count 1, without count', async function (assert) {
    const count = 1;
    const singular = 'orange';
    const withoutCount = true;

    await render(
      <template>
        {{pluralize count singular without-count=withoutCount}}
      </template>,
    );

    assert.dom().hasText('orange');
  });

  test('pluralize - bound count 1.0 float', async function (assert) {
    const count = 1.0;
    const singular = 'owl';

    await render(<template>{{pluralize count singular}}</template>);

    assert.dom().hasText('1 owl');
  });

  test('pluralize - bound count 1.0 float, without count', async function (assert) {
    const count = 1.0;
    const singular = 'owl';
    const withoutCount = true;

    await render(
      <template>
        {{pluralize count singular without-count=withoutCount}}
      </template>,
    );

    assert.dom().hasText('owl');
  });

  test('pluralize - bound count 1.0 float, without-count=false, specifies count and word', async function (assert) {
    const count = 1.0;
    const singular = 'owl';
    const withoutCount = false;

    await render(
      <template>
        {{pluralize count singular without-count=withoutCount}}
      </template>,
    );

    assert.dom().hasText('1 owl');
  });

  test('pluralize - bound count 1.5 float', async function (assert) {
    const count = 1.5;
    const singular = 'owl';

    await render(<template>{{pluralize count singular}}</template>);

    assert.dom().hasText('1.5 owls');
  });

  test('pluralize - bound count 1.5 float, without count', async function (assert) {
    const count = 1.5;
    const singular = 'owl';
    const withoutCount = true;

    await render(
      <template>
        {{pluralize count singular without-count=withoutCount}}
      </template>,
    );

    assert.dom().hasText('owls');
  });

  test('pluralize - bound count 1.0 string', async function (assert) {
    const count = '1.0';
    const singular = 'owl';

    await render(<template>{{pluralize count singular}}</template>);

    assert.dom().hasText('1.0 owl');
  });

  test('pluralize - bound count 1.0 string, without count', async function (assert) {
    const count = '1.0';
    const singular = 'owl';
    const withoutCount = true;

    await render(
      <template>
        {{pluralize count singular without-count=withoutCount}}
      </template>,
    );

    assert.dom().hasText('owl');
  });

  test('pluralize - bound count 1.5 string', async function (assert) {
    const count = '1.5';
    const singular = 'owl';

    await render(<template>{{pluralize count singular}}</template>);

    assert.dom().hasText('1.5 owls');
  });

  test('pluralize - bound count 1.5 string, without count', async function (assert) {
    const count = '1.5';
    const singular = 'owl';
    const withoutCount = true;

    await render(
      <template>
        {{pluralize count singular without-count=withoutCount}}
      </template>,
    );

    assert.dom().hasText('owls');
  });

  test('pluralize - bound count 2', async function (assert) {
    const count = 2;
    const singular = 'omnivore';

    await render(<template>{{pluralize count singular}}</template>);

    assert.dom().hasText('2 omnivores');
  });

  test('helpers - pluralize - bound count 2, without count', async function (assert) {
    const count = 2;
    const singular = 'omnivore';
    const withoutCount = true;

    await render(
      <template>
        {{pluralize count singular without-count=withoutCount}}
      </template>,
    );

    assert.dom().hasText('omnivores');
  });
});
