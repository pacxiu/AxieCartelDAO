# Repo Starter

1. React App Rewired -  https://github.com/timarney/react-app-rewired
2. Redux as store management with duck methodology
3. Styling made with CSS/SASS modules `module.sass` or with standard CSS/SASS `.sass`.
4. Hot reload
5. Eslint

##### Eslint made with Airbnb config and some custom tweaks

It can be disabled in `./config-overrides.js` by commenting out lines or tweaking it in `./eslintrc`:

```sh
  const rewireEslint = require('react-app-rewire-eslint');
  ...
  config = rewireEslint(config, env, overrideEslintOptions);
```