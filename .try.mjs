// When building your addon for older Ember versions you need to have the required files
const compatFiles = {
  'ember-cli-build.cjs': `const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { compatBuild } = require('@embroider/compat');
module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');
  let app = new EmberApp(defaults);
  return compatBuild(app, buildOnce);
};`,
  'config/optional-features.json': JSON.stringify({
    'application-template-wrapper': false,
    'default-async-observers': true,
    'jquery-integration': false,
    'template-only-glimmer-components': true,
    'no-implicit-route-model': true,
  }),
};

const compatDeps = {
  '@embroider/compat': '^4.0.3',
  'ember-cli': '^5.12.0',
  'ember-auto-import': '^2.10.0',
  '@ember/optional-features': '^2.2.0',
};

/**
 * Compat (classic build) scenarios, mirroring the ember-try matrix this addon
 * used before moving to the flat blueprint.
 *
 * The old matrix went back to ember-lts-3.16. Support below 4.5 was
 * intentionally dropped: `pluralize`/`singularize` are now plain functions
 * rather than `make-helper` wrappers, and plain functions are only usable as
 * helpers from ember-source 4.5 onwards. Verified — 4.4 fails every helper
 * rendering test with "Attempted to use a value as either a component or
 * helper, but it did not have a component manager or helper manager
 * associated with it".
 *
 * 4.8 rather than 4.5 is the oldest scenario because 4.5 additionally fails
 * to build under the Embroider/Vite compat pipeline, for reasons unrelated to
 * the helpers ("Cannot access 'Engine' before initialization"). 4.8 is both
 * the oldest LTS at or above the 4.5 helper floor and the oldest version that
 * builds, and it passes the full suite.
 */
function compatScenario(name, emberSource) {
  return {
    name,
    npm: {
      devDependencies: {
        'ember-source': emberSource,
        ...compatDeps,
      },
    },
    env: {
      ENABLE_COMPAT_BUILD: true,
    },
    files: compatFiles,
  };
}

export default {
  scenarios: [
    compatScenario('ember-lts-4.8', '~4.8.0'),
    compatScenario('ember-lts-4.12', '~4.12.0'),
    compatScenario('ember-lts-5.4', '~5.4.0'),
    compatScenario('ember-lts-5.8', '~5.8.0'),
    compatScenario('ember-lts-5.12', '~5.12.0'),
    {
      name: 'ember-lts-6.4',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@~6.4.0',
        },
      },
    },
    {
      name: 'ember-latest',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@latest',
        },
      },
    },
    {
      name: 'ember-beta',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@beta',
        },
      },
    },
    {
      name: 'ember-alpha',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@alpha',
        },
      },
    },
  ],
};
